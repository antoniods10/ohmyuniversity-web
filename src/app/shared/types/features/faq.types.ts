import { ContentBase } from '@shared/types';

/** FAQ item */
export type FaqItem = ContentBase;

/** FAQ category grouping multiple items */
export interface FaqCategory {
  title: string;
  items: FaqItem[];
}
