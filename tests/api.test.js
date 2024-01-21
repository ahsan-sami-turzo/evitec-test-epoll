const request = require('supertest');
const app = require('../app/api'); // Update the path accordingly

describe('API Endpoints', () => {
    it('GET /polls should return a list of polls', async () => {
        const response = await request(app).get('/polls');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('polls');
    });

    // Add more tests for other endpoints
});
