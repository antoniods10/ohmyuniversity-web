export interface CourseSchedule {
  id: string;
  courseName: string;
  acronym: string;
  university: string;
  department: string;
  semester: string;
  academicYear: string;
  status: 'available' | 'unavailable';
  downloadUrl?: string;
  externalUrl?: string;
  updatedAt: string;
}

export interface ScheduleSearchResult {
  courseName: string;
  department: string;
  semester: string;
  university: string;
  downloadUrl?: string;
  externalUrl?: string;
}
