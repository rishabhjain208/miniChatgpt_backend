const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../index.js');
// Assuming you export your express app from app.js or similar

dotenv.config();

describe('API Tests', () => {
  // Connect to the test database before running tests
  let conn
  beforeAll(async () => {
    conn=await mongoose.createConnection(process.env.MONGODB_URL).asPromise();
  });

  // Close the connection after tests are done
  afterAll(async () => {
    await conn.close();
  });

  // Test the root endpoint
  it('GET / should return working', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('working');
  });

  // Test user registration
  it('POST /api/auth/register should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'riya@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

//   // Test user login
  it('POST /api/auth/login should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token');
  });

//   // Test asking a question (requires authentication)
  it('POST /api/questions should create a new question', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        question: 'Hoe are you?',
      });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('saved_Ques');
  });

  // Test fetching a question (requires authentication)
  it('GET /api/questions/:questionId should return a question', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    const token = loginRes.body.token;
   // put questionId for get questions
    const questionId="666f2d502520599a89a6d19c"

    const res = await request(app)
      .get(`/api/questions/${questionId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.question).toHaveProperty('_id', questionId);
  });})

