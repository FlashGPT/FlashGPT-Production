import { FlashcardDeckFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch all flashcardDeck data from sanity
 * @returns flashcardDecks fetched
 */
export async function fetchFlashcardDeck(): Promise<FlashcardDeckFetch[]> {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getFlashcardDeck`,
  );
  const { flashcardDecks } = await res.json();

  return flashcardDecks;
}
