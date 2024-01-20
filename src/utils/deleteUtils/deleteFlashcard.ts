/**
 * Deletes flashcard by Id
 * @param flashcardId flashcardId to delete
 * @returns response of the query
 */
export async function deleteFlashcard(flashcardId: string): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteFlashcard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flashcardId: flashcardId }),
    },
  );

  return response;
}
