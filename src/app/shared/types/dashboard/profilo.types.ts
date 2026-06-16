import { AccountStatus } from '@ui/avatar-profile-panel/avatar-profile-panel.component';

export interface CourseEntry {
  id: string;
  name: string;
  acronym: string;
  university: string;
  year: number;
  totalYears: number;
  status: AccountStatus;
  enrolledAt: string;
  matricola: string;
  cfu: number;
  cfuTotal: number;
}
