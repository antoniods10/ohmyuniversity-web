/**
 * Restituisce l'anno corrente come stringa.
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Restituisce una stringa di copyright formattata.
 * Es: "© 2025 OhMyUniversity"
 */
export function buildCopyrightString(name: string): string {
  return `© ${getCurrentYear()} ${name}`;
}
