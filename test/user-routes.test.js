import request from 'supertest';
import app from '../api/app';
import { bootstrapdb } from '../api/dao/sequelize';




describe('User Routes', () => {
  let server;

  beforeAll(async () => {
    server = app.listen();
    await bootstrapdb();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('POST /v1/user creates a new user', async () => {
    const userData = {
      first_name: 'abc',
      last_name: 'abc',
      password: 'abc',
      username: 'abc@example.com'
    };

    const response = await request(server)
      .post('/v1/user')
      .send(userData);

    expect(response.status).toBe(201);
  });

  test('GET /v1/user/self retrieves the user profile', async () => {
    const response = await request(server)
      .get('/v1/user/self')
      .set('Authorization', `Basic ${Buffer.from('abc@example.com:abc').toString('base64')}`); 

    expect(response.status).toBe(200);
  });

  test('PUT /v1/user/self updates the user profile', async () => {
    const updatedUserData = {
      first_name: 'updatedFirstName',
      last_name: 'updatedLastName'
    };

    const response = await request(server)
      .put('/v1/user/self')
      .set('Authorization', `Basic ${Buffer.from('abc@example.com:abc').toString('base64')}`)
      .send(updatedUserData);

    expect(response.status).toBe(204);
  });
});
