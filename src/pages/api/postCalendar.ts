import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";
import { CalendarCreate } from "@/model/sanityCreateTypings";

type Data = {};

type CreateCalendarProp = {
  create: CalendarCreate;
};

/**
 * Creates a new calendar entry in sanity
 * @param req Request body contains flashcardDeckId to be added
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardDeckId = req.body.flashcardDeckId;
  const mutations: CreateCalendarProp[] = [
    {
      create: {
        _type: "calendar",
        flashcardDeck: {
          _type: "reference",
          _ref: flashcardDeckId,
          _key: flashcardDeckId,
        },
      },
    },
  ];

  await postToSanity(mutations)
    .then((res) => res.json())
    .then((data) => {
      console.log("Create calendar data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return res.status(200).json({});
}
