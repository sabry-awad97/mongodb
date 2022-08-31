import { RequestHandler } from 'express';
import Driver from '../models/driver.model';

export const greeting: RequestHandler = (req, res) => {
  res.send({ hello: 'world' });
};

export const create: RequestHandler = async (req, res, next) => {
  const driverProps = req.body;
  try {
    const driver = await Driver.create(driverProps);
    res.send(driver);
  } catch (error) {
    next(error);
  }
};
