// import type { NextApiRequest, NextApiResponse } from 'next';

// type ResponseBody = { message: string };

export default function handler(req, res) {

  res.status(401).json({ message: 'Not authenticated.',success :false });
  
};