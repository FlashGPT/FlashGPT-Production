import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type ModifyProp = {
  patch: {
    id: string;
    insert: any;
  };
};

type Data = {};

/**
 * Adds a calendar to the category array in auth
 * @param req Request body contains authId and calendarId
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const authId = req.body.authId;
  const calendarId = req.body.calendarId;

  const mutations: ModifyProp[] = [
    {
      patch: {
        id: authId,
        insert: {
          after: "calendar[-1]",
          items: [
            {
              _type: "reference",
              _ref: calendarId,
              _key: calendarId,
            },
          ],
        },
      },
    },
  ];
  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      console.log("Patch auth category data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({});
}
