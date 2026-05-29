/**
 * Returns the current year as a string.
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Builds a formatted copyright string.
 *
 * Example: "© 2025 OhMyUniversity"
 */
export function buildCopyrightString(name: string): string {
  return `© ${getCurrentYear()} ${name}`;
}
