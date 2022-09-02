import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
});

describe('GET /api/v1/todos', () => {
  it('responds with an array of todos', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/todos', () => {
  it('responds with an error if the todo is invalid', async () =>
    await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then(response => {
        expect(response.body).toHaveProperty('message');
      }));
  it('responds with an inserted object', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    id = response.body._id;
    expect(response.body).toHaveProperty('content');
    expect(response.body.content).toBe('Learn TypeScript');
    expect(response.body).toHaveProperty('done');
  });
});

describe('GET /api/v1/todos/:id', () => {
  it('responds with a single todo', async () => {
    const response = await request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBe(id);
    expect(response.body).toHaveProperty('content');
    expect(response.body.content).toBe('Learn TypeScript');
    expect(response.body).toHaveProperty('done');
  });

  it('responds with an invalid ObjectId error', async () => {
    await request(app)
      .get('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('responds with a not found error', async () => {
    await request(app)
      .get('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});

describe('PUT /api/v1/todos/:id', () => {
  it('responds with an invalid ObjectId error', async () => {
    await request(app)
      .put('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('responds with a not found error', async () => {
    await request(app)
      .put('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('responds with a single todo', async () => {
    const response = await request(app)
      .put(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBe(id);
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('done');
    expect(response.body.done).toBe(true);
  });
});

describe('DELETE /api/v1/todos/:id', () => {
  it('responds with an invalid ObjectId error', async () => {
    await request(app)
      .delete('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('responds with a not found error', async () => {
    await request(app)
      .delete('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('responds with a 204 status code', async () => {
    await request(app).delete(`/api/v1/todos/${id}`).expect(204);
  });

  it('responds with a not found error', async () => {
    await request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect(404);
  });
});
