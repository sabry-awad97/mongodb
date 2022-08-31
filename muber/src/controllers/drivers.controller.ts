import { RequestHandler } from 'express';
import Driver from '../models/driver.model';

export const index: RequestHandler = async (req, res, next) => {
  const { lng, lat } = req.query;

  try {
    const drivers = await Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)],
          },
          spherical: true,
          maxDistance: 200000,
          distanceField: 'distance',
        },
      },
    ]);
    res.send(drivers);
  } catch (error) {
    next(error);
  }
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

export const edit: RequestHandler = async (req, res, next) => {
  const driverId = req.params.id;
  const driverProps = req.body;

  await Driver.findByIdAndUpdate({ _id: driverId }, driverProps);
  const driver = await Driver.findById({ _id: driverId });
  res.send(driver);
};

export const remove: RequestHandler = async (req, res, next) => {
  const driverId = req.params.id;

  try {
    const driver = await Driver.findByIdAndRemove({ _id: driverId });
    res.status(204).send(driver);
  } catch (error) {
    next(error);
  }
};
