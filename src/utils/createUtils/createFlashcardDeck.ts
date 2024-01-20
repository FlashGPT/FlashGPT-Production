import {
  FlashcardDeckCreate,
  FlashcardCreate,
  FlashcardDeckInfo,
} from "@/model/sanityCreateTypings";

/**
 * This async function sends flashcard decks to sanity and returns the id
 * @param flashcardDeckInfo Bare info about the flashcard deck
 * @param flashcardIds The Id of the flashcards to be added to the deck
 * @param categoryId The id of the category to be added to the deck
 * @returns The id of the created flashcard deck
 */
export async function createFlashcardDeck(
  flashcardDeckInfo: FlashcardDeckInfo,
  flashcardIds: string[],
  categoryId: string,
): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postFlashcardDeck`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flashcardIds: flashcardIds,
        flashcardDeckInfo: flashcardDeckInfo,
        categoryId: categoryId,
      }),
    },
  );

  const { id } = await response.json();

  return id;
}
