export type ExamStatus = 'open' | 'closing' | 'closed' | 'booked';
export type QuestionnaireStatus = 'pending' | 'completed';

export interface Exam {
  id: string;
  courseName: string;
  courseAcronym: string;
  professor: string;
  date: string;
  time: string;
  location: string;
  building: string;
  enrollDeadline: string;
  spotsTotal: number;
  spotsLeft: number;
  status: ExamStatus;
  cfu: number;
  year: number;
}

export interface Questionnaire {
  id: string;
  courseName: string;
  professor: string;
  type: string;
  deadline: string;
  status: QuestionnaireStatus;
  completedAt?: string;
}
