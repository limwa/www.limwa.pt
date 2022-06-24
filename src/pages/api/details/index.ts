import type { NextApiHandler } from 'next';
import { z } from 'zod';
import { readDetails, type DetailMap } from '@/utils/details';

type Response = {
  details: DetailMap;
};

const details = readDetails().then((details) => {
  const detailMap: DetailMap = {};
  for (const detail of details) {
    detailMap[detail.name] = {
      type: detail.type,
      value: detail.value,
    };
  }

  return detailMap;
});

const handler: NextApiHandler<Response> = async (req, res) => {
  return res.status(200).json({ details: await details });
};

export default handler;
