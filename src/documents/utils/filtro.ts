export function filterFieldsWithAlias<T extends Record<string, any>>(
  data: T[],
  fieldsToShow?: (keyof T)[],
  aliasMap?: Record<keyof T, string>,
): Record<string, any>[] {
  if (!fieldsToShow) return data;

  return data.map((item) => {
    const filtered: Record<string, any> = {};
    fieldsToShow.forEach((field) => {
      const key = aliasMap?.[field] ?? (field as string); // <-- cast para string
      filtered[key] = item[field];
    });
    return filtered;
  });
}
