import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { AuthFetch } from "../../model/sanityFetchTypings";

const query = groq`
  *[_type == "auth"]  
`;

type Data = {
  auths: AuthFetch[];
};

/**
 * Fetch all auths from sanity
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const auths: AuthFetch[] = await sanityClient.fetch(query);

  res.status(200).json({ auths });
}
