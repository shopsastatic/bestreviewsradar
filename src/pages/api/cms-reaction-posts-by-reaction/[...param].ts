import { GET_USER_REACTION_POSTS_FIRST_COMMON } from "@/contains/contants";
import { getApolloClient } from "@faustwp/core";
import type { NextApiRequest, NextApiResponse } from "next";

export type CMSReactionPostsResponseData = {
  data?: any | null;
  error?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CMSReactionPostsResponseData>
) {
  const client = getApolloClient();
  const param = req.query.param || null;

  const userID = param?.[0];
  const reaction = param?.[1];

  if (!userID || !reaction) {
    res.status(400).send({ error: "Param is required and must like: /1/save" });
    return;
  }
}
