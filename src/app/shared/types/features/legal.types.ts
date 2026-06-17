export interface LegalCookieTable {
  name: string;
  purpose: string;
  duration: string;
}

export interface LegalListItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface LegalLabeledItem {
  label: string;
  text: string;
}

export interface LegalTableRow {
  label: string;
  value: string;
}
