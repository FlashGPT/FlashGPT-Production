import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { ContentFetch } from "../../model/sanityFetchTypings";

const query = groq`
  *[_type == "content"]
`;

type Data = {
  contents: ContentFetch;
};

/**
 * Fetch all contents from sanity
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const contents: ContentFetch = await sanityClient.fetch(query);

  res.status(200).json({ contents });
}
