import { FlashcardCreate } from "@/model/sanityCreateTypings";

/**
 * Async function to send flashcards to sanity and returns the ids
 * @param flashcards flashcards to be sent
 * @returns ids of the flashcards sent
 */
export async function createFlashcard(
  flashcards: FlashcardCreate[],
): Promise<string[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postFlashcard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flashcards: flashcards }),
    },
  );

  const { ids } = await response.json();

  return ids;
}
