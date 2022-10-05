const supertest = require('supertest');

const app = require('../app');
const User = require('../models/User');
const { createToken } = require('../services/authentication');

async function login() {
  const user = await User.findOne();
  const token = createToken(user);
  return token;
}

describe('login', () => {
  // More things come here
  it('should return 200 OK', async () => {
    console.log('POLOLO', await login());
    return await supertest(app)
      .post('/user/login')
      .send({
        email: 'admin@gmail.com',
        password: 'admin',
      })
      .expect(200);
  });
});

describe('home page', () => {
  // More things come here
  it('should return 200 OK', async () => {
    const token = await login();
    return await supertest(app)
      .get('/user/get')
      .auth(token, { type: 'bearer' })
      // .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});

// describe('GET product', () => {
//   describe('GET /product/get', () => {
//     it('should return 200 OK', () => {
//       return supertest(app).get('/product/get').expect(200);
//     });
//   });

//   describe('GET /product/getByCategory/:id', () => {
//     it('should return 200 OK', () => {
//       return supertest(app).get('/product/getByCategory/1').expect(200);
//     });
//   });
// });
