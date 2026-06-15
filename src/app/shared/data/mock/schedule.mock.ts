import { CourseSchedule } from '@shared/types/schedule.types';

export const MOCK_MY_SCHEDULES: CourseSchedule[] = [
  {
    id: 's1',
    courseName: 'Ingegneria Informatica',
    acronym: 'LM',
    university: 'Università di Bologna',
    department: 'DISI',
    semester: '2° Semestre',
    academicYear: '2024/2025',
    status: 'available',
    downloadUrl: '#',
    externalUrl: 'https://corsi.unibo.it',
    updatedAt: '10 giugno 2025',
  },
  {
    id: 's2',
    courseName: 'Fisica Teorica',
    acronym: 'LMcu',
    university: 'Università di Pisa',
    department: 'Dipartimento di Fisica',
    semester: '2° Semestre',
    academicYear: '2024/2025',
    status: 'available',
    externalUrl: 'https://unipi.it',
    updatedAt: '8 giugno 2025',
  },
];
