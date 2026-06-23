import { UserTypeOption } from '@shared/types';

export const USER_TYPE_OPTIONS: UserTypeOption[] = [
  {
    id: 'academic',
    label: 'Studente o Dottorando',
    sublabel: 'Accesso gratuito',
    description: 'Accedi con le credenziali del tuo ateneo tramite SSO',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  },
  {
    id: 'staff',
    label: 'Docente o Staff tecnico',
    sublabel: 'Accesso gratuito',
    description: 'Accedi con le credenziali istituzionali del tuo ateneo',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    id: 'organization',
    label: 'Azienda o Collettivo',
    sublabel: 'Piano a pagamento',
    description: 'Accedi con le tue credenziali OhMyUniversity',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
];
