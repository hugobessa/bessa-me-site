import { NextApiRequest, NextApiResponse } from 'next';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ status: "OK" })
}