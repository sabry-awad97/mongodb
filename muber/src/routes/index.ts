import { Application } from 'express';
import { greeting } from '../controllers/drivers.controller';

const routes = (app: Application) => {
  app.get('/api', greeting);
};

export default routes;
