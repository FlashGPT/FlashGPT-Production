import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type Data = {};

/**
 * Handles the deletion of old calendar entries older than 1 year
 * @returns empty response params
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const mutations = [
    {
      delete: {
        query:
          "*[_type == 'calendar' && dateTime(_createdAt) < dateTime($date)]",
        params: {
          date: getOneYearAgo(),
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

function getOneYearAgo(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
}
