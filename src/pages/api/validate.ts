import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthorizationSignature } from "lnurl";

import { db } from "@/server/db";
import { lnAuthTable } from "@/schema/db";
import { createId } from "@/utils/id";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { k1, key: pubkey, sig } = req.query;
  const authorize = await verifyAuthorizationSignature(sig, k1, pubkey);

  if (!authorize) {
    return res.status(400).json({
      success: false,
      error: "Error in keys.",
    });
  }

  await db.insert(lnAuthTable).values({
    id: createId(),
    k1: k1 as string,
    pubkey: pubkey as string,
    userId: null,
  });

  res.send(JSON.stringify({ status: "OK", success: true, k1 }));
}
