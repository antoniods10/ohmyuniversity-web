export type ContactCampus = 'all' | 'campobasso' | 'termoli' | 'pesche';

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

export interface ProfessorContact {
  id: string;
  name: string;
  role: string;
  department: string;
  courses: string[];
  email: string;
  phone?: string;
  office?: string;
  hours?: string;
  campus: ContactCampus;
  website?: string;
}

export interface InstitutionalContact {
  id: string;
  name: string;
  description: string;
  phone?: string;
  email?: string;
  hours?: string;
  campus: ContactCampus;
}
