import { AccountStatus } from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { Identifiable } from '@shared/types';

/** Degree program / course of study the student is enrolled in, with progress and enrollment details */
export interface CourseEntry extends Identifiable {
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
