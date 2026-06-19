import { TeachingPeriod, AttendanceType } from '@shared/types';

export const TEACHING_PERIOD_LABELS: Record<TeachingPeriod, string> = {
  FIRST_SEMESTER: 'Primo Ciclo Semestrale',
  SECOND_SEMESTER: 'Secondo Ciclo Semestrale',
  ANNUAL: 'Annuale',
};

export const ATTENDANCE_LABELS: Record<AttendanceType, string> = {
  MANDATORY: 'Obbligatoria',
  NOT_MANDATORY: 'Non obbligatoria',
};
