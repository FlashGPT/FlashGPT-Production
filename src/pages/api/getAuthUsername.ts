import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { AuthFetch } from "../../model/sanityFetchTypings";

type Data = {
  auths: AuthFetch[];
};

/**
 * Fetch auth based on username from sanity
 * @param req contains username of the auth to fetch
 * @return a list of auths fetched. Should only have 0 or 1 entities
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const username = req.body.username;
  const email = req.body.email;
  const query = groq`
    *[_type == 'auth' && username == "${username}" || email == "${email}"]
  `;
  const auths: AuthFetch[] = await sanityClient.fetch(query);

  res.status(200).json({ auths });
}
