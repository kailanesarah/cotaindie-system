export function getCurrentMonthRange() {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).toISOString();

  return { startDate, endDate };
}
