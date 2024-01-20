import { AuthCreate } from "@/model/sanityCreateTypings";

/**
 * This function creates the auth user and sends to sanity through the API
 * @param user User to be added to sanity
 * @param return The response of the fetch request
 */
export async function createAuth(user: AuthCreate): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postAuth`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );

  return response;
}
