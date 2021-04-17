const request = require('supertest');
const User = require('../../models/UserModel');

let server;

describe('/api/users', () => {
    console.log(process.env.NODE_ENV)
    beforeEach(() => { server = require('../../server'); })
    afterEach( async () => { 
        server.close(); 
        await User.remove({});
    })
     describe('GET /', () => {
         it('should return all users', async () => {
            await User.collection.insertMany([
                { 
                    name: 'Name1',
                    email: "Jejsonjonsorn@jss.com",
                    password: "123564747",
                    avatar: "http://costam"
                }
            ])

            const res = await request(server).get('/api/users');
            expect(res.status).toBe(200);
            expect(res.body.some(user => user.name === 'Name1')).toBeTruthy();
         })
     })
 })