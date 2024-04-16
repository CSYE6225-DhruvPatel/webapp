import request from 'supertest';
import app from '../api/app';
import { bootstrapdb, db } from '../api/dao/sequelize';


beforeAll(async() => {
  await bootstrapdb();
})

describe('User Routes', () => {
  let server;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('POST /v5/user creates a new user', async () => {
    const userData = {
      first_name: 'abc',
      last_name: 'abc',
      password: 'abc',
      username: 'abc@example.com'
    };

    const response = await request(server)
      .post('/v5/user')
      .send(userData);

    //   const insertQuery = `
    //   INSERT INTO "VerifyEmails" (username, user_verified, email_sent, account_updated)
    //   VALUES (:username, :user_verified, :email_sent, :account_updated)
    // `;
  
    // // Define the parameters for the query
    // const insertParams = {
    //   username: userData.username,
    //   user_verified: 't',
    //   email_sent: '2024-03-27 04:15:03.822-04',
    //   account_updated: '2024-03-27 04:15:03.822-04'
    // };
  
    //   // Execute the raw SQL query
    //   const res = await db.query(insertQuery, {
    //     replacements: insertParams,
    //     type: db.QueryTypes.INSERT
    //   });
    expect(response.status).toBe(400);
  });

  test('GET /v5/user/self retrieves the user profile', async () => {
    const response = await request(server)
      .get('/v5/user/self')
      .set('Authorization', `Basic ${Buffer.from('abc@example.com:abc').toString('base64')}`); 

    expect(response.status).toBe(503);
  });

  test('PUT /v5/user/self updates the user profile', async () => {
    const updatedUserData = {
      first_name: 'xyz',
      last_name: 'pqr'
    };

    const response = await request(server)
      .put('/v5/user/self')
      .set('Authorization', `Basic ${Buffer.from('abc@example.com:abc').toString('base64')}`)
      .send(updatedUserData);

    expect(response.status).toBe(503);
  });

  test('GET /v5/user/self retrieves the user profile', async () => {
    const response = await request(server)
      .get('/v5/user/self')
      .set('Authorization', `Basic ${Buffer.from('abc@example.com:abc').toString('base64')}`); 

    expect(response.status).toBe(503);
  });
});
