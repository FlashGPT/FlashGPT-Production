import { hashPassword } from "@/utils/authUtils/hashUtil";
import { postToSanity } from "@/utils/postToSanity";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {};

/**
 * Creats a new user in sanity
 * @param req Request body contains the user to be created
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const user = req.body;
  const hashedPassword = await hashPassword(user.password);
  const mutations = [
    {
      create: {
        _type: "auth",
        name: user.name,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        category: [],
        calendar: [],
      },
    },
  ];

  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      console.log("Create user data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({});
}
