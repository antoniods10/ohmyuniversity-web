/** Possible availability states of a course schedule */
export type ScheduleStatus = 'available' | 'unavailable';

/** Schedule details shared between full schedule records and search results */
export interface ScheduleInfo {
  courseName: string;
  department: string;
  semester: string;
  university: string;
  downloadUrl?: string;
  externalUrl?: string;
}

/** Full schedule record for a course, including identification and availability */
export interface CourseSchedule extends ScheduleInfo {
  id: string;
  acronym: string;
  academicYear: string;
  status: ScheduleStatus;
  updatedAt: string;
}
