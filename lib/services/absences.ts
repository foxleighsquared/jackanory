// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const initialData = [
  {
    id: '12',
    userID: 2,
    firstDayAbsent: '2021-01-11',
    absenceType: 'sickness',
    lastDayAbsent: '',
    absenceReason: 'COVID-19 (Confirmed)',
    workRelatedStress: false,
    workRelatedHealthSafety: false,
    pregnancyRelated: false
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof initialData | { message: string }>
) {
  res.status(200).json(initialData);
}
