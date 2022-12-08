const supertest = require('supertest');

const app = require('../app');
const User = require('../models/User');
const { createToken } = require('../services');

async function login({ role = null }) {
  const options = {};
  if (role) {
    options = { attributes: ['role'], where: { role } };
  }
  const user = await User.findOne(options);
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
      .post('/login')
      .send({
        email: 'admin.com',
        password: 'admin2',
      })
      .expect(200);
  });
});

describe('GET All Guest', () => {
  it('should return 200 OK', async () => {
    const { token } = await login('admin');
    return await supertest(app)
      .get('/user')
      .set('Authorization', token)
      .expect(200);
  });

  it('should return 401 Unauthorized', async () => {
    return await supertest(app).get('/user').expect(401);
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
