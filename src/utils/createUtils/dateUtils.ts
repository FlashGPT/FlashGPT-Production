export const weekDateCondition = (date: Date) => {
  const today = new Date();
  const currentDay = today.getDay();
  const daysToMonday = currentDay === 0 ? 6 : 1 - currentDay;
  const daysToSunday = 7 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + daysToMonday);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysToSunday);

  return date >= monday && date <= sunday;
};
