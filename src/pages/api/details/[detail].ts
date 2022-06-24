import type { NextApiHandler } from 'next';
import { z } from 'zod';
import { DetailParser, readDetail, type Detail } from '@/utils/details';

const DetailQuery = z
  .object({
    detail: z
      .string()
      .min(1)
      .transform((s) => encodeURIComponent(s)),
  })
  .transform((req) => req.detail);

type ResponseSuccess = {
  detail: Detail;
};

type ResponseError = {
  errors?: z.ZodIssue[];
};

type Response = ResponseSuccess | ResponseError;

const handler: NextApiHandler<Response> = async (req, res) => {
  const parsedQuery = DetailQuery.safeParse(req.query);

  if (!parsedQuery.success) {
    const errors = parsedQuery.error.issues;
    return res.status(400).json({ errors });
  }

  const detailName = parsedQuery.data;
  let detail: Detail | null = null;
  try {
    detail = await readDetail(detailName);
  } catch (err) {
    if (err instanceof z.ZodError && process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ errors: err.issues });
    }
  }

  if (!detail) {
    return res.status(404).json({});
  }

  return res.status(200).json({ detail });
};

export default handler;
