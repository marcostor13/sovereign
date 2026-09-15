/**
 * Motor de los formularios de los embudos.
 *
 * El HTML completo lo renderiza el servidor (`StepForm.astro`); este script
 * sólo añade la navegación paso a paso, la validación, el envío y la pantalla
 * de resultado. Dos modos:
 *
 *  - `steps` (quiz): una pregunta por pantalla, barra de progreso, avance
 *    automático en preguntas de opción única.
 *  - `card` (registro): todas las preguntas visibles a la vez.
 *
 * El resultado lo decide el servidor; el cliente sólo lo presenta.
 */
import { getTracking, newEventId, track } from './track';
import { formUi as t } from '../../data/funnels';
import { CONTACT_KEY, WL_TOKEN_KEY, savedContact, store } from './storage';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const phoneOk = (pais: string, telefono: string) => {
  const digits = telefono.replace(/\D/g, '');
  const cc = pais.replace(/\D/g, '');
  const national = digits.startsWith(cc) && digits.length > (cc === '1' ? 10 : 9) ? digits.slice(cc.length) : digits;
  return cc === '1' ? national.length === 10 : national.length >= 7 && national.length <= 12;
};

function initStepForm(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('form')!;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  const mode = root.dataset.mode === 'card' ? 'card' : 'steps';
  const btnBack = form.querySelector<HTMLButtonElement>('[data-back]');
  const btnNext = form.querySelector<HTMLButtonElement>('[data-next]');
  const btnSubmit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = btnSubmit.querySelector<HTMLElement>('[data-label]');
  const progress = form.querySelector<HTMLElement>('[data-progress]');
  const counter = form.querySelector<HTMLElement>('[data-count]');
  const errorBox = form.querySelector<HTMLElement>('[data-form-error]');
  const results = root.querySelector<HTMLElement>('[data-results]');

  let current = 0;
  let started = false;

  const field = <T extends Element = HTMLInputElement>(sel: string) => form.querySelector<T>(sel);

  /* --- Lectura de respuestas ------------------------------------------ */

  const valueOf = (step: HTMLFieldSetElement): unknown => {
    const key = step.dataset.key!;
    switch (step.dataset.type) {
      case 'multi':
        return [...step.querySelectorAll<HTMLInputElement>(`input[name="${key}"]:checked`)].map((i) => i.value);
      case 'state': {
        const picked = step.querySelector<HTMLInputElement>(`input[name="${key}"]:checked`)?.value || '';
        return picked === 'otro' ? step.querySelector<HTMLSelectElement>('select')?.value || '' : picked;
      }
      case 'contact':
        return null;
      default:
        return step.querySelector<HTMLInputElement>(`input[name="${key}"]:checked`)?.value || '';
    }
  };

  const answers = () => {
    const out: Record<string, unknown> = {};
    steps.forEach((s) => {
      if (s.dataset.type === 'contact') return;
      out[s.dataset.key!] = valueOf(s);
      if (s.dataset.type === 'combo') {
        const text = s.querySelector<HTMLInputElement>('input[type="text"]');
        if (text) out[text.name] = text.value.trim();
      }
    });
    return out;
  };

  const contact = () => ({
    nombre: field('[name="nombre"]')?.value.trim() || '',
    email: field('[name="email"]')?.value.trim() || '',
    pais: field<HTMLSelectElement>('[name="pais"]')?.value || '+1',
    telefono: field('[name="telefono"]')?.value.trim() || '',
  });

  /* --- Validación -------------------------------------------------------- */

  const setError = (step: HTMLFieldSetElement, name: string | null, msg: string) => {
    const slot = name ? step.querySelector<HTMLElement>(`[data-error-for="${name}"]`) : step.querySelector<HTMLElement>('[data-step-error]');
    if (slot) slot.textContent = msg;
    if (name) step.querySelector(`[name="${name}"]`)?.setAttribute('aria-invalid', 'true');
  };

  const clearErrors = (step: HTMLFieldSetElement) => {
    step.querySelectorAll<HTMLElement>('[data-error-for], [data-step-error]').forEach((el) => (el.textContent = ''));
    step.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  };

  const validate = (step: HTMLFieldSetElement) => {
    clearErrors(step);
    const type = step.dataset.type;

    if (type === 'contact') {
      const c = contact();
      let ok = true;
      if (!c.nombre) (setError(step, 'nombre', t.required), (ok = false));
      if (!EMAIL_RE.test(c.email)) (setError(step, 'email', c.email ? t.invalidEmail : t.required), (ok = false));
      if (!phoneOk(c.pais, c.telefono)) (setError(step, 'telefono', c.telefono ? t.invalidPhone : t.required), (ok = false));
      if (!field('[name="consent"]')?.checked) (setError(step, 'consent', t.consentRequired), (ok = false));
      return ok;
    }

    const v = valueOf(step);
    if (Array.isArray(v) ? !v.length : !v) {
      setError(step, null, type === 'multi' ? t.chooseMany : type === 'state' ? t.otherStateSelect : t.choose);
      return false;
    }

    if (type === 'combo') {
      const text = step.querySelector<HTMLInputElement>('input[type="text"]');
      if (text && !text.value.trim()) {
        setError(step, text.name, t.required);
        return false;
      }
    }
    return true;
  };

  /* --- Navegación (modo steps) ------------------------------------------- */

  const render = (focus = true) => {
    if (mode === 'card') return;
    steps.forEach((s, i) => (s.hidden = i !== current));
    const last = current === steps.length - 1;
    if (btnBack) btnBack.hidden = current === 0;
    if (btnNext) btnNext.hidden = last;
    btnSubmit.hidden = !last;
    if (progress) progress.style.transform = `scaleX(${(current + 1) / steps.length})`;
    if (counter) counter.textContent = t.stepOf(current + 1, steps.length);
    if (focus) steps[current].querySelector<HTMLElement>('legend')?.focus({ preventScroll: true });
  };

  const go = (i: number) => {
    current = Math.max(0, Math.min(steps.length - 1, i));
    render();
    track('QuizStep', { step: current + 1, form: root.dataset.product });
    // En móvil el quiz ocupa la pantalla: se mantiene el inicio a la vista.
    const top = form.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const markStarted = () => {
    if (started) return;
    started = true;
    track(root.dataset.startEvent || 'QuizStart', { form: root.dataset.product });
  };

  btnNext?.addEventListener('click', () => {
    if (validate(steps[current])) go(current + 1);
  });
  btnBack?.addEventListener('click', () => go(current - 1));

  form.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    markStarted();
    const step = input.closest<HTMLFieldSetElement>('[data-step]');
    if (!step) return;
    clearErrors(step);

    // "Otro estado" despliega la lista completa.
    if (step.dataset.type === 'state') {
      const other = step.querySelector<HTMLElement>('[data-state-other]');
      const isOther = step.querySelector<HTMLInputElement>(`input[name="${step.dataset.key}"]:checked`)?.value === 'otro';
      if (other) other.hidden = !isOther;
      if (isOther && input.type === 'radio') {
        step.querySelector<HTMLSelectElement>('select')?.focus();
        return;
      }
    }

    const autoAdvance =
      mode === 'steps' &&
      input.type === 'radio' &&
      (step.dataset.type === 'single' || (step.dataset.type === 'state' && input.value !== 'otro')) &&
      steps.indexOf(step) === current &&
      current < steps.length - 1;

    if (autoAdvance) setTimeout(() => go(current + 1), 240);
  });

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLElement;
    el.removeAttribute('aria-invalid');
    const slot = form.querySelector<HTMLElement>(`[data-error-for="${(el as HTMLInputElement).name}"]`);
    if (slot) slot.textContent = '';
  });

  // Enter en un campo de texto avanza en vez de enviar a medias.
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || mode === 'card') return;
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT' || current === steps.length - 1) return;
    e.preventDefault();
    btnNext?.click();
  });

  /* --- Precarga ---------------------------------------------------------- */

  const saved = savedContact();
  if (saved) {
    (['nombre', 'email', 'telefono'] as const).forEach((k) => {
      const input = field(`[name="${k}"]`);
      if (input && saved[k]) input.value = saved[k]!;
    });
    const pais = field<HTMLSelectElement>('[name="pais"]');
    if (pais && saved.pais) pais.value = saved.pais;
  }

  /* --- Envío ------------------------------------------------------------- */

  const showResult = (result: string, data: { bookingUrl?: string | null }, name: string) => {
    if (!results) return;
    form.hidden = true;
    results.hidden = false;
    results.querySelectorAll<HTMLElement>('[data-result]').forEach((el) => (el.hidden = el.dataset.result !== result));
    const view = results.querySelector<HTMLElement>(`[data-result="${result}"]`);
    if (!view) return;

    const first = name.split(/\s+/)[0] || '';
    view.querySelectorAll<HTMLElement>('[data-fill-name]').forEach((el) => {
      el.textContent = (el.dataset.fillName || '').replace('{nombre}', first);
    });

    const booking = view.querySelector<HTMLElement>('[data-booking]');
    if (booking) {
      const frame = booking.querySelector<HTMLElement>('[data-booking-frame]');
      const fallback = booking.querySelector<HTMLElement>('[data-booking-fallback]');
      if (data.bookingUrl && frame) {
        const iframe = document.createElement('iframe');
        iframe.src = data.bookingUrl;
        iframe.title = 'Agenda tu consulta';
        iframe.loading = 'lazy';
        iframe.allow = 'payment';
        frame.replaceChildren(iframe);
        frame.hidden = false;
        if (fallback) fallback.hidden = true;
      } else if (fallback) {
        fallback.hidden = false;
      }
    }

    view.querySelector<HTMLElement>('h3, h2')?.setAttribute('tabindex', '-1');
    view.querySelector<HTMLElement>('h3, h2')?.focus({ preventScroll: true });
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorBox) errorBox.hidden = true;

    // Valida todo; lleva a la persona al primer paso incompleto.
    const invalid = steps.findIndex((s) => !validate(s));
    if (invalid !== -1) {
      if (mode === 'steps') go(invalid);
      steps[invalid].querySelector<HTMLElement>('[aria-invalid="true"], input')?.focus();
      return;
    }

    const eventId = newEventId();
    const c = contact();
    const fd = new FormData(form);
    const payload = {
      answers: answers(),
      contact: c,
      consent: { accepted: true },
      tracking: getTracking(root.dataset.variant),
      eventId,
      pageUrl: location.href,
      website: fd.get('website') || '',
      turnstile: fd.get('cf-turnstile-response') || '',
      token: new URLSearchParams(location.search).get('t') || store.raw(WL_TOKEN_KEY) || undefined,
    };

    btnSubmit.disabled = true;
    const original = submitLabel?.textContent || '';
    if (submitLabel) submitLabel.textContent = t.sending;

    try {
      const res = await fetch(root.dataset.endpoint!, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));

      if (res.status === 422 && body.errors) {
        const keys = Object.keys(body.errors);
        const target = steps.findIndex((s) => keys.includes(s.dataset.key!) || keys.some((k) => s.querySelector(`[name="${k}"]`)));
        const step = steps[target === -1 ? steps.length - 1 : target];
        keys.forEach((k) => setError(step, step.querySelector(`[name="${k}"]`) ? k : null, t.required));
        if (mode === 'steps') go(steps.indexOf(step));
        return;
      }

      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);

      store.set(CONTACT_KEY, { nombre: c.nombre, email: c.email, telefono: c.telefono, pais: c.pais });
      track('Lead', { form: root.dataset.product, variant: root.dataset.variant }, eventId);
      if (body.result === 'A' || body.result === 'D') {
        track('LeadCalificado', { value: body.score, currency: 'USD', form: root.dataset.product }, `${eventId}-q`);
      }

      if (body.token) store.set(WL_TOKEN_KEY, body.token);

      const redirect = root.dataset.redirect;
      if (redirect) {
        const url = new URL(redirect, location.origin);
        if (body.token) url.searchParams.set('t', body.token);
        location.assign(url.href);
        return;
      }

      showResult(body.result, body, c.nombre);
    } catch (err) {
      console.error('[form]', err);
      if (errorBox) errorBox.hidden = false;
    } finally {
      btnSubmit.disabled = false;
      if (submitLabel) submitLabel.textContent = original;
    }
  });

  render(false);
}

document.querySelectorAll<HTMLElement>('[data-stepform]').forEach(initStepForm);
