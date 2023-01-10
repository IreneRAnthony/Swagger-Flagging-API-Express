const request = require('supertest');
const app = require('../src/app');

// If tests fail, please check that:
// - Creating a new user has a unique email address
// - Finding a specific user and updating it has a valid id
// - Deleting a user has a valid id (This will actually delete the user from the DB)

describe('Get all users', () => {
  test('Should return a 200 response, and an array of all the users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
  });
});

describe('Create a new user', () => {
  test('Should return a 200 response, and the new created user', async () => {
    const newUser = {
      email: "user7@gmail.com",
      password: "password"
    };
    const res = await request(app).post('/user').send(newUser);
    expect(res.statusCode).toBe(201);
    // expect(res.body).toHaveProperty();
  });
});

describe('Test incorrect input for POST /user', () => {
  test('Should return a 400 response', async () => {
    const newUser = {
      password: "email"
    };
    const res = await request(app).post('/user').send(newUser);
    expect(res.statusCode).toBe(400);
  });
});

describe('Get user with id param', () => {
  test('Should return a 200 response, and the user', async () => {
    // User id needs to be valid with current DB
    const userId = '6375728ee88b97b9bbf6b7bf';
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('Update user with id param', () => {
  test('It should return a 200 response', async () => {
    const userId = "6375728ee88b97b9bbf6b7be";
    const updatedUser = {
      password: "newPassword"
    };
    const res = await request(app).patch(`/user/${userId}`).send(updatedUser);
    expect(res.statusCode).toBe(200);
  });

});

describe('Delete user with id param', () => {
  test('It should return a 200 response', async () => {
    const userId = "6375728ee88b97b9bbf6b7bc";
    const res = await request(app).delete(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});
