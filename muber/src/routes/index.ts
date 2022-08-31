import { Application } from 'express';
import { index, create, edit, remove } from '../controllers/drivers.controller';

const routes = (app: Application) => {
  app.post('/api/drivers', create);
  app.put('/api/drivers/:id', edit);
  app.delete('/api/drivers/:id', remove);
  app.get('/api/drivers', index);
};

export default routes;
