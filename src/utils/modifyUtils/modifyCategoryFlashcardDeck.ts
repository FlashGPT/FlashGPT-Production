/**
 * This async function modifies the FlashcardDeck reference for category
 * @param categoryId id of the category to modify
 * @param flashcardDeckId id of the flashcardDeck to reference to
 */
export async function modifyCategoryFlashcardDeck(
  categoryId: string,
  flashcardDeckId: string,
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/patchCategoryFlashcardDeck`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flashcardDeckId: flashcardDeckId,
        categoryId: categoryId,
      }),
    },
  );
  return;
}
