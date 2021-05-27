export const buildAllowedSortFields = (fields: string[] = []) => {
  // allowed fields DESCENDING ORDER
  const minusFields = fields.map((field) => `-${field}`);

  // both ASC & DESC ORDER fields
  return [...fields, ...minusFields];
};
