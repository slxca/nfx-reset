/**
 * Generates a random hexadecimal string of the specified length.
 *
 * @param {number} length - The desired length of the hexadecimal string
 * @returns {string} A random hexadecimal string (characters 0-9, a-f)
 */
export function randomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random UUID v4 (Universally Unique Identifier) in standard format.
 *
 * @returns {string} A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export function makeUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retrieves the Netflix profile GUID (Global Unique Identifier) from localStorage.
 *
 * Attempts to parse the MDX_PROFILEID from localStorage and extract the profile ID.
 * Returns null if the profile ID cannot be found or if there is an error parsing the stored data.
 *
 * @returns {string|null} The profile GUID if found, or null if unavailable or parsing fails
 */
export function getProfileGuid(): string | null {
  try {
    const raw = localStorage.getItem('MDX_PROFILEID');
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p?.id ?? p?.data ?? null;
  } catch {
    return null;
  }
}