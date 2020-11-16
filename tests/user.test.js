const request = require('supertest')
require('../database/db');
const app = require('../app');

describe('Test User Endpoints', () => {

    // User registration endpoint test
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                email: "jonh@gmail.com",
                password: 'test123',
                name: "obededom"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('message')
    })

    // User login endpoint test
    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: "jonh@gmail.com",
                password: 'test123',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('message')
    })
})