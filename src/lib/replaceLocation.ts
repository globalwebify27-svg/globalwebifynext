/**
 * Replaces {location} placeholders in text with the given location name.
 * If loc is empty, the placeholder (and surrounding prepositions) are removed cleanly.
 */
export function replaceLocation(text: string, loc: string): string {
  if (!text) return '';
  const rawRegex = /\{\s*location\s*\}/gi;
  if (!loc) {
    let cleaned = text.replace(/\b(?:in|at|for|from|within|near)\s+\{\s*location\s*\}/gi, '');
    cleaned = cleaned.replace(rawRegex, '');
    cleaned = cleaned.replace(/\s{2,}/g, ' ').replace(/\s+([.,!?;:])/g, '$1');
    return cleaned.trim();
  }
  return text.replace(rawRegex, loc);
}

/**
 * Strip all HTML tags from a string, returning only text content.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
