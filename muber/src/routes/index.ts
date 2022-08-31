import { Application } from 'express';
import { greeting, create } from '../controllers/drivers.controller';

const routes = (app: Application) => {
  app.get('/api', greeting);
  app.post('/api/drivers', create);
};

export default routes;
