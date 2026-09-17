/**
 * Piezas comunes a los dos embudos: tipos de los formularios de varios pasos,
 * opciones compartidas y textos de interfaz.
 */
import type { IconName } from './site';

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export type StepType = 'single' | 'multi' | 'state' | 'combo' | 'contact';

export interface Step {
  key: string;
  type: StepType;
  question: string;
  hint?: string;
  options?: Option[];
  /** `combo`: campo de texto que acompaña a las opciones. */
  text?: { key: string; label: string; placeholder?: string };
}

export interface TrustItem {
  icon: IconName;
  label: string;
  /** Línea secundaria. En el primer ítem, por defecto, el número de licencia o la cobertura. */
  detail?: string;
}

/**
 * Testimonios reales, con autorización escrita guardada y sin cifras de
 * rendimiento, dividendos ni montos. Mientras la lista esté vacía la sección no
 * se renderiza (nunca se muestran marcadores).
 */
export interface Testimonial {
  quote: string;
  name: string; // nombre o iniciales
  city: string;
  product: 'iul' | 'wl' | 'general';
  /** Divulgación obligatoria si hubo compensación. */
  compensated?: boolean;
}

export const testimonials: Testimonial[] = [];

export const countryCodes = [
  { code: '+1', label: '+1 EE.UU. / PR' },
  { code: '+52', label: '+52 México' },
  { code: '+57', label: '+57 Colombia' },
  { code: '+58', label: '+58 Venezuela' },
  { code: '+53', label: '+53 Cuba' },
  { code: '+503', label: '+503 El Salvador' },
  { code: '+502', label: '+502 Guatemala' },
  { code: '+504', label: '+504 Honduras' },
  { code: '+505', label: '+505 Nicaragua' },
  { code: '+506', label: '+506 Costa Rica' },
  { code: '+507', label: '+507 Panamá' },
  { code: '+51', label: '+51 Perú' },
  { code: '+593', label: '+593 Ecuador' },
  { code: '+54', label: '+54 Argentina' },
  { code: '+56', label: '+56 Chile' },
  { code: '+598', label: '+598 Uruguay' },
  { code: '+591', label: '+591 Bolivia' },
  { code: '+595', label: '+595 Paraguay' },
  { code: '+34', label: '+34 España' },
] as const;

export const formUi = {
  back: 'Atrás',
  next: 'Continuar',
  stepOf: (n: number, total: number) => `Paso ${n} de ${total}`,
  otherState: 'Vivo en otro estado',
  otherStateSelect: 'Selecciona tu estado',
  name: 'Nombre',
  email: 'Email',
  phone: 'WhatsApp',
  country: 'País del número',
  required: 'Este campo es obligatorio',
  choose: 'Elige una opción para continuar',
  chooseMany: 'Elige al menos una opción',
  invalidEmail: 'Revisa el email',
  invalidPhone: 'Revisa el número (10 dígitos en EE.UU.)',
  consentRequired: 'Necesitamos tu autorización para contactarte',
  sending: 'Enviando…',
  error: 'No pudimos enviar tus respuestas. Inténtalo de nuevo o llámanos al',
  privacy: 'Política de Privacidad',
  terms: 'Términos',
} as const;
