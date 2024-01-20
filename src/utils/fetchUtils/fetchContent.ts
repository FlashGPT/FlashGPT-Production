import { ContentFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch all content data from sanity
 * @returns fetched content data
 */
export async function fetchContent(): Promise<ContentFetch[]> {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getContent`,
  );
  const { contents } = await res.json();

  return contents;
}
