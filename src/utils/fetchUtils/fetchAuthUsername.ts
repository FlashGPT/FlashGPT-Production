import { AuthFetch } from "@/model/sanityFetchTypings";

/**
 * Gets a user that matches the username
 * @param username username to match with
 * @return the user that has been fetched
 */
export async function fetchAuthUsername(
  username: string,
  email: string,
): Promise<AuthFetch[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAuthUsername`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, email: email }),
    },
  );

  const { auths } = await res.json();

  return auths;
}
