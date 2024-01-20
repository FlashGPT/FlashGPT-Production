/**
 * This async function sends a calendar entry to sanity through the API
 * @param flashcardDeckId flashcardDeck id to reference to
 * @param return response of the request
 */
export async function createCalendar(
  flashcardDeckId: string,
): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postCalendar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flashcardDeckId: flashcardDeckId }),
    },
  );

  return response;
}
