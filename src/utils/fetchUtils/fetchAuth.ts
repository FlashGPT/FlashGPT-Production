import { AuthFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch all auth data from sanity
 * @returns returns auth data
 */
export async function fetchAuth(): Promise<AuthFetch[]> {
  const res = await fetch(`${process.env.SANITY_STUDIO_BASE_URL}/api/getAuth`);
  const { auths } = await res.json();

  return auths;
}
