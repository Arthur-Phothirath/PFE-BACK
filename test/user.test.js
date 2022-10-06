const supertest = require('supertest');

const app = require('../app');
const User = require('../models/User');
const { createToken } = require('../services/authentication');

async function login() {
  const user = await User.findOne();
  const token = createToken(user);
  return {
    token: 'Bearer ' + token,
    user: user,
  };
}

// function createUser() {
//   return {
//     name: 'guest',
//     contactNumber: '1',
//     email: 'guest.com',
//     password: 'guest',
//     valided: 0,
//     role: 'guest',
//   };
// }

describe('login', () => {
  // More things come here
  it('should return 200 OK', async () => {
    return await supertest(app)
      .post('/user/login')
      .send({
        email: 'admin.com',
        password: 'admin',
      })
      .expect(200);
  });
});

describe('GET All Guest', () => {
  // More things come here
  it('should return 200 OK', async () => {
    const { token } = await login();
    return await supertest(app)
      .get('/user/getAllUser')
      .set('Authorization', token)
      .expect(200);
  });
});

// describe('POST signup', () => {
//   // More things come here
//   it('should return 200 OK', async () => {
//     const userData = createUser();
//     return await supertest(app)
//       .post('/user/signup')
//       .send({
//         name: userData.name,
//         contactNumber: userData.contactNumber,
//         email: userData.email,
//         password: userData.password,
//         valided: userData.valided,
//         role: userData.role,
//       })
//       .expect(200);
//   });
// });
