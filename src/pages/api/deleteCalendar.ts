import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type Data = {};

/**
 * Handles the deletion of calendar by Id
 * @req constains calendarId
 * @returns empty response params
 * TODO: Testing not complete
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const calendarId = req.body.calendarId;
  const mutations = [
    {
      delete: {
        query: "*[_type == 'calendar' && _id == '$calendarId']",
        params: {
          calendarId: calendarId,
        },
      },
    },
  ];

  postToSanity(mutations)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return res.status(200).json({});
}
