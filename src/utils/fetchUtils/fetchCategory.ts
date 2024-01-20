import { CategoryFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch all categories from sanity
 * @returns fetched categories
 */
export async function fetchCategory(): Promise<CategoryFetch[]> {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getCategory`,
  );
  const { categories } = await res.json();

  return categories;
}
