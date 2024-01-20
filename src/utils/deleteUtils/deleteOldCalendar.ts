/**
 * This function deletes all calendar entries from 1 year ago
 */
export async function deleteOldCalendar() {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/deleteOldCalendar`,
  );

  return;
}
