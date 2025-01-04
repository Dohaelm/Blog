import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  if (typeof postId !== 'string') {
    return res.status(400).json({ error: 'Invalid postId' });
  }

  try {
    const likeCount = await prisma.like.count({
      where: { postId },
    });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
