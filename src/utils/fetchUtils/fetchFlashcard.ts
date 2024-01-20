import { FlashcardFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch all flashcards from sanity
 * @returns flashcards fetched
 */
export async function fetchFlashcard(): Promise<FlashcardFetch[]> {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getFlashcard`,
  );
  const { flashcards } = await res.json();

  return flashcards;
}
