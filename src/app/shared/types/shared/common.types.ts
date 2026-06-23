import { LucideIconData } from '@lucide/angular';

/** Icon value accepted across the app: a Lucide icon, an icon name string, or any custom value. */
export type Icon = LucideIconData | string | any;

/** Anything with a label and a url (social links, support links, etc.) */
export interface LinkBase {
  label: string;
  url: string;
}

/** Anything with a title and a description (cards, sections, etc.) */
export interface ContentBase {
  title: string;
  description: string;
}

/** Anything with a name and a role (people, members, etc.) */
export interface PersonBase {
  name: string;
  role: string;
}

/** Selectable option with an id and a label (selects, wizards, etc.) */
export interface OptionBase<TValue = string> {
  id: TValue;
  label: string;
}

/** Link with an icon and a forced color (social, support, etc.) */
export interface IconLink extends LinkBase {
  iconComponent: Icon;
  colorForce: string;
}

/** Rich option with a sublabel, description and icon */
export interface RichOption<TValue = string> extends OptionBase<TValue> {
  sublabel: string;
  description: string;
  icon: Icon;
}

/** Anything with an icon, title and description (cards, features, ecc.) */
export interface IconContentBase {
  icon: Icon;
  title: string;
  description: string;
}

/** Numbered step with title and description */
export interface StepBase {
  number: number;
  title: string;
  description: string;
}

/** Generic key-value pair with a label and a text/value string */
export interface LabeledValue {
  label: string;
  value: string;
}

/** Anything identified by an id and a name (courses, scholarships, fees, ecc.) */
export interface Identifiable {
  id: string;
  name: string;
}
