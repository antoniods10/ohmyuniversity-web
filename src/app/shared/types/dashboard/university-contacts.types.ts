import { Identifiable, PersonBase } from '@shared/types';

/** Campuses where a contact or office can be reached */
export type ContactCampus = 'all' | 'campobasso' | 'termoli' | 'pesche';

/** Administrative office contact with reachability details */
export interface SecretariatContact {
  id: string;
  office: string;
  description: string;
  email: string;
  phone?: string;
  hours?: string;
  campus: ContactCampus;
  website?: string;
}

/** Professor contact with teaching department, courses and reachability details */
export interface ProfessorContact extends Identifiable, PersonBase {
  department: string;
  courses: string[];
  email: string;
  phone?: string;
  office?: string;
  hours?: string;
  campus: ContactCampus;
  website?: string;
}

/** Institutional contact (department, body, etc.) with reachability details */
export interface InstitutionalContact extends Identifiable {
  description: string;
  phone?: string;
  email?: string;
  hours?: string;
  campus: ContactCampus;
}
