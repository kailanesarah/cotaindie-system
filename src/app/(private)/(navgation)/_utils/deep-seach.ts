export const deepSearch = <T extends Record<string, any>>(
  items: T[],
  filters: string[],
): T[] =>
  items.filter((item) =>
    filters.every((filter) => {
      const term = filter.toLowerCase();

      const checkValue = (value: unknown): boolean => {
        if (value == null) return false;

        if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(term);
        }

        if (Array.isArray(value)) {
          return value.some((v) => checkValue(v));
        }

        if (typeof value === "object") {
          return Object.values(value as Record<string, unknown>).some((v) =>
            checkValue(v),
          );
        }

        return false;
      };

      return checkValue(item);
    }),
  );
