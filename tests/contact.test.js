const request = require('supertest')
require('../database/db');
const app = require('../app');

describe('Post Endpoints', () => {
    // Add Contact endpoint test
    it('should create a new contact', async () => {
        const res = await request(app)
            .post('/api/contacts/add')
            .send({
                firstname: "jonh",
                lastname: 'test',
                phone: "06077"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contact')
        expect(res.body).toHaveProperty('message')
    })

    // Get all Contact endpoint test
    it('should get all contact', async () => {
        const res = await request(app)
            .get('/api/contacts/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contact')
    })

    // Get single Contact endpoint test
    it('should get a single contact', async () => {
        const res = await request(app)
            .get('/api/contacts/5faa557cf9faf94e5826c274')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contact')
    })

    // TO delete  a single Contact endpoint test
    it('should delete a contact', async () => {
        const res = await request(app)
            .delete('/api/contacts/5faa562e2c645d4e58f6ef5e')
        expect(res.statusCode).toEqual(401)
        // expect(res.body).toHaveProperty('contact')
    })

    // Add Contact endpoint test
    it('should update a contact', async () => {
        const res = await request(app)
            .put('/api/contacts/5faa562e2c645d4e58f6ef5e')
            .send({
                firstname: "obed",
                lastname: 'test',
                phone: "06077"
            })
        expect(res.statusCode).toEqual(401)
        //  expect(res.body).toHaveProperty('contact')
        //  expect(res.body).toHaveProperty('message')
        // expect(res.body).toEqual('Post not found');

    })
})