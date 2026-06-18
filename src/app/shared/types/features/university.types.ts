/** Represents an Italian university registered in the platform. */
export interface University {
  id: string;
  name: string;
  shortName: string;
  emailDomains: string[];
  city: string;
  type: 'statale' | 'privata' | 'telematica';
  campuses: UniversityCampus[];
}

/** Represents a single campus/pole (sede) of a university. */
export interface UniversityCampus {
  id: string;
  name: string;
  city: string;
  address?: string;
}
