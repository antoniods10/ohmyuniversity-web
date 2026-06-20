// contatti-form-organization.component.ts
export const ORG_TYPES = [
  'Azienda privata',
  'Startup',
  'Ente pubblico',
  'Collettivo studentesco',
  'Associazione no-profit',
  'Altro',
] as const;

// contatti-form-academic.component.ts
export const ACADEMIC_ROLES = [
  'Studente',
  'Dottorando',
  'Docente',
  'Ricercatore',
  'Staff tecnico-amministrativo',
  'Rettore / Direzione ateneo',
] as const;

export const ACADEMIC_SUBJECTS = [
  'Problema tecnico / Bug',
  'Il mio ateneo non è supportato',
  'Richiesta di integrazione per il mio ateneo',
  'Domanda sul funzionamento',
  'Feedback sul prodotto',
  'Altro',
] as const;
