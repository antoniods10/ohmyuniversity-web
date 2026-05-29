export type UserType = 'academic' | 'staff' | 'organization' | null;
export type LoginStep = 1 | 2;

export interface UserTypeOption {
  id: UserType;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
}
