import { environment } from '@environments/environment';

const BASE = environment.apiUrl;

export const API = {
  auth: {
    login: `${BASE}/v1/auth/login`,
    refresh: `${BASE}/v1/auth/refresh`,
    logout: `${BASE}/v1/auth/logout`,
  },
} as const;
