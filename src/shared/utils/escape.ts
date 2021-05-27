/**
 * Escape sql wildcard characters: %_-[]^
 * @param value
 */
export const escapeSqlWildcardChars = (value: string): string => {
  return value.replace(/[%_\-\[\]^]/g, (char) => `\\${char}`);
};
