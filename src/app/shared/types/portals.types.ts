export type PortalCategory =
  | 'segreteria'
  | 'didattica'
  | 'email'
  | 'borse'
  | 'carriera'
  | 'collaborazione'
  | 'benessere'
  | 'internazionale';

export interface Portal {
  id: string;
  name: string;
  description: string;
  url: string;
  category: PortalCategory;
  tags: string[];
  featured?: boolean;
}

export interface PortalCategoryDef {
  id: PortalCategory;
  label: string;
  icon: any;
  color: string;
  bg: string;
}
