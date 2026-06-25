import { AccountEntry } from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { CourseEntry } from '@shared/types/dashboard/dashboard-profile.types';

export const MOCK_ACCOUNT: AccountEntry = {
  id: 'acc-1',
  name: 'Mario Rossi',
  email: 'mario.rossi@studenti.unibo.it',
  courseLabel: 'Ingegneria Informatica',
  courseAcronym: 'LM',
  universityLabel: 'Università di Bologna',
  status: 'active',
  isCurrent: true,
};

export const MOCK_PROFILE_EDIT = {
  phone: '+39 333 123 4567',
  city: 'Bologna',
  bio: 'Studente di Ingegneria Informatica magistrale. Appassionato di algoritmi, sistemi distribuiti e open source.',
};

export const MOCK_COURSES: CourseEntry[] = [
  {
    id: 'c1',
    name: 'Ingegneria Informatica',
    acronym: 'LM',
    university: 'Università di Bologna',
    year: 1,
    totalYears: 2,
    status: 'active',
    enrolledAt: 'Settembre 2023',
    matricola: '0001234567',
    cfu: 42,
    cfuTotal: 120,
  },
  {
    id: 'c2',
    name: 'Fisica Teorica',
    acronym: 'LMcu',
    university: 'Università di Pisa',
    year: 3,
    totalYears: 5,
    status: 'warning',
    enrolledAt: 'Settembre 2021',
    matricola: '0009876543',
    cfu: 98,
    cfuTotal: 300,
  },
  {
    id: 'c3',
    name: 'Matematica',
    acronym: 'L',
    university: 'Università di Torino',
    year: 3,
    totalYears: 3,
    status: 'graduated',
    enrolledAt: 'Settembre 2018',
    matricola: '0005554433',
    cfu: 180,
    cfuTotal: 180,
  },
];
