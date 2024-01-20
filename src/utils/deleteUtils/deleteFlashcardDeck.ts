/**
 * Deletes flashcardDeck by Id
 * @param flashcardDeckId Id of flashcardDeck to delete
 * @returns response of the query
 */
export async function deleteFlashcardDeck(
  flashcardDeckId: string,
): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteFlashcardDeck`,
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
