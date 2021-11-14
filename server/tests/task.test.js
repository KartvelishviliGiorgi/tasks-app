const request = require('supertest')
const app = require('../app')

describe('Users API', () => {
    it('GET /task --> array tasks', () => {
        return request(app)
            .get('/task')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: expect.any(Boolean),
                        tasks: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                title: expect.any(String),
                                description: expect.any(String),
                                due_date: expect.any(String),
                                status: expect.any(Number),
                                author_id: expect.any(Number),
                            }),
                        ]),
                    })
                )
            })
    })
})
