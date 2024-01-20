import { CategoryInfo } from "@/model/sanityCreateTypings";

/**
 * This async function sends category to sanity and returns the id
 * @param categoryInfo info for the category to be sent
 * @returns The id of the created category
 */
export async function createCategory(
  categoryInfo: CategoryInfo,
): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postCategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryInfo: categoryInfo }),
    },
  );

  const { id } = await response.json();

  return id;
}
