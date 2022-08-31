import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

const app = express();
app.use(express.json());

routes(app);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(422).send({ error: err.message });
};

app.use(errorHandler);

export default app;
