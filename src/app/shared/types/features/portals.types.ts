import { OptionBase, Icon } from '@shared/types';

/** Available portal categories */ export type PortalCategory =
  | 'segreteria'
  | 'didattica'
  | 'email'
  | 'borse'
  | 'carriera'
  | 'collaborazione'
  | 'benessere'
  | 'internazionale';

/** A portal entry with its category, tags and access url */
export interface Portal {
  id: string;
  name: string;
  description: string;
  url: string;
  category: PortalCategory;
  tags: string[];
  featured?: boolean;
}

/** Definition of a portal category with visual styling */
export interface PortalCategoryDef extends OptionBase<PortalCategory> {
  icon: Icon;
  color: string;
  bg: string;
}
