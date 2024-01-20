import { AuthFetch } from "@/model/sanityFetchTypings";

/**
 * Gets a user that matches the username all
 * @param username username to match with
 * @return the user that has been fetched
 */
export async function fetchAuthUsernameAll(
  username: string,
  email: string,
): Promise<AuthFetch[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAuthUsernameAll`,
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
