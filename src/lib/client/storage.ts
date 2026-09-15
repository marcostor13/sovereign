/**
 * Persistencia local de los embudos (sólo en el dispositivo de la persona).
 * Todo va envuelto: en modo privado o con el almacenamiento bloqueado, la
 * página sigue funcionando sin recordar nada.
 */

export const CONTACT_KEY = 'sov_contact';
export const WL_TOKEN_KEY = 'sov_wl_token';

export interface SavedContact {
  nombre?: string;
  email?: string;
  telefono?: string;
  pais?: string;
}

export const store = {
  get<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null') as T | null;
    } catch {
      return null;
    }
  },
  raw(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch {
      /* sin persistencia */
    }
  },
};

export const savedContact = () => store.get<SavedContact>(CONTACT_KEY);
