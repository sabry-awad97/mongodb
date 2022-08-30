import { RequestHandler } from 'express';

export const greeting: RequestHandler = (req, res) => {
  res.send({ hello: 'world' });
};
