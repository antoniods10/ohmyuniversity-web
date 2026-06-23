import { RichOption } from '@shared/types';

export type UserType = 'academic' | 'staff' | 'organization' | null;
export type LoginStep = 1 | 2;

/** Selectable user type option in the login wizard */
export type UserTypeOption = RichOption<UserType>;
