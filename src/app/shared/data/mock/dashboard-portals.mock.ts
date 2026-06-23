export interface PortalLink {
  label: string;
  url: string;
  description: string;
}

export const MOCK_PORTALS: Record<string, PortalLink> = {
  esse3: {
    label: 'Esse3 / Cineca',
    url: 'https://esse3.example.it',
    description: 'Gestione carriera, esami e pagamenti',
  },
  moodle: {
    label: 'Moodle',
    url: 'https://moodle.example.it',
    description: 'Materiale didattico e corsi online',
  },
  mail: {
    label: 'Mail Universitaria',
    url: 'https://mail.example.it',
    description: 'La tua casella di posta istituzionale',
  },
  website: {
    label: 'Sito Web',
    url: 'https://www.example.it',
    description: 'Il sito ufficiale del tuo ateneo',
  },
};

export const ALL_PORTALS: PortalLink[] = Object.values(MOCK_PORTALS);
