const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

describe('POST /api/calculate', () => {
  let token;

  beforeAll(() => {
    // Generate a test token
    token = jwt.sign(
      { id: 1, userType: 'EMPLOYEE', tenure: 1 },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should calculate payable amount correctly', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { category: 'groceries', price: 200 },
          { category: 'electronics', price: 300 },
        ],
        originalCurrency: 'USD',
        targetCurrency: 'EUR',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('payableAmount');
  });

  it('should return 401 if token is missing', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        items: [{ category: 'groceries', price: 200 }],
        originalCurrency: 'USD',
        targetCurrency: 'EUR',
      });

    expect(response.statusCode).toBe(401);
  });
});
