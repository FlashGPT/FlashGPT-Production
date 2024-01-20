/**
 * Deletes calendar by Id
 * @param calendarId Id of the calendar to delete
 * @returns response of the query
 */
export async function deleteCalendar(calendarId: string): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteCalendar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendarId: calendarId }),
    },
  );

  return response;
}
