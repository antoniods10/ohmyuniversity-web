export type ExamStatus = 'PASSED' | 'TO_TAKE';
export type CourseType = 'MANDATORY' | 'ELECTIVE';
export type ExamFilter = 'ALL' | 'PASSED' | 'TO_TAKE' | 'ELECTIVE';
export type TrendDirection = 'up' | 'down' | 'flat';

/** Exam modality: written test or oral interview. */
export type SessionType = 'WRITTEN' | 'ORAL';

/** Booking state of a single exam slot. */
export type BookingStatus = 'AVAILABLE' | 'BOOKED' | 'CLOSED';

/** Academic calendar session. */
export type AcademicSession = 'SUMMER' | 'WINTER' | 'EXTRAORDINARY';

/** Filter applied to the academic session column. */
export type SessionFilter = 'ALL' | AcademicSession;

/** Filter applied to the exam modality column. */
export type TypeFilter = 'ALL' | SessionType;

export interface Exam {
  courseCode: string;
  courseName: string;
  cfu: number;
  grade: string;
  status: ExamStatus;
  type: CourseType;
  academicYear: number;
}

export interface FilterOption {
  id: ExamFilter;
  label: string;
}

export interface ExamGroup {
  year: number;
  yearLabel: string;
  exams: Exam[];
  passedCount: number;
}

export interface ChartPoint {
  value: number;
  isLast: boolean;
}

/** A single bookable exam slot in the student's study plan. */
export interface ExamSlot {
  id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  date: string;
  time: string;
  type: SessionType;
  status: BookingStatus;
  session: AcademicSession;
  location: string;
  maxEnrollments: number;
  currentEnrollments: number;
}

/** Descriptor for session filter tabs. */
export interface SessionFilterOption {
  id: SessionFilter;
  label: string;
}

/** Descriptor for exam-type filter tabs. */
export interface TypeFilterOption {
  id: TypeFilter;
  label: string;
}
