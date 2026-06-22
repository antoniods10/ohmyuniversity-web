export interface ContactTeacher {
  name: string;
  subject: string;
  email: string;
  office: string;
}

export interface ContactUseful {
  label: string;
  phone: string;
  notes?: string;
}

export const MOCK_TEACHERS: ContactTeacher[] = [
  {
    name: 'Prof. Mario Rossi',
    subject: 'Analisi Matematica II',
    email: 'mario.rossi@unibo.it',
    office: 'Edificio A, stanza 12',
  },
  {
    name: 'Prof.ssa Laura Bianchi',
    subject: 'Fisica II',
    email: 'laura.bianchi@unibo.it',
    office: 'Edificio B, stanza 5',
  },
  {
    name: 'Prof. Andrea Verdi',
    subject: 'Programmazione II',
    email: 'andrea.verdi@unibo.it',
    office: 'Edificio C, stanza 8',
  },
  {
    name: 'Prof.ssa Giulia Neri',
    subject: 'Algoritmi',
    email: 'giulia.neri@unibo.it',
    office: 'Edificio A, stanza 20',
  },
  {
    name: 'Prof. Luca Ferrari',
    subject: 'Basi di Dati',
    email: 'luca.ferrari@unibo.it',
    office: 'Edificio D, stanza 3',
  },
];

export const MOCK_USEFUL_CONTACTS: ContactUseful[] = [
  { label: 'Segreteria Studenti', phone: '+39 051 000 0000', notes: 'Lun-Ven 9:00-12:00' },
  { label: 'Ufficio Erasmus', phone: '+39 051 000 0001', notes: 'Mar-Gio 10:00-13:00' },
  { label: 'Biblioteca Centrale', phone: '+39 051 000 0002' },
  { label: 'Ufficio Borse di Studio', phone: '+39 051 000 0003', notes: 'Lun-Ven 9:00-11:00' },
  { label: 'Servizio Disabilità', phone: '+39 051 000 0004' },
];
