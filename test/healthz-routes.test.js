// healthz-routes.test.js
import request from 'supertest';
import app from '../api/app.js';

describe('Health Endpoint', () => {
  let server;

  beforeAll(() => {
    server = app.listen(); // Create an HTTP server from the app
  });

  afterAll((done) => {
    server.close(done); // Close the server after all tests are done
  });

  test('GET /healthz returns status 200', async () => {
    const response = await request(server).get('/healthz'); // Use the server object
    expect(response.status).toBe(200);
  });
});
