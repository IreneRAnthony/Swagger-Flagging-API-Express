const request = require('supertest');
const app = require('../src/app');

// If tests fail, please check that:
// - Creating a new user has a unique flaggedItemId (either user or project)
// - Finding a specific user and updating it has a valid id
// - Deleting a flag has a valid id (This will actually delete the flag from the DB)

  describe('Get all current flags', () => {
    test('Should return a 200 response, and a array of all flagged items', async () => {
      const res = await request(app).get(`/flag`);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Creates a new flag', () => {
    test('Should return a 201 response, and the created flag', async () => {
      const newFlaggedItem = {
          flaggedItemId: "63b4d2cabdc7f5834fc0e4fa",
          flaggedItemType: "project",
          comment: "I am a fellow user, and I marked this user for these reasons.",
          adminComment: "I am a admin, and I agree that this user is marked correctly.",
          markedForDeletion: true
      };
      const res = await request(app).post('/flag').send(newFlaggedItem);
      expect(res.statusCode).toBe(201);
    });
  });
  
  describe('Get a specific flagged item with id param', () => {
    test('Should return a 200 response, and the specific flagged item', async () => {
      const flaggedItemId = "63757381e88b97b9bbf6b7d2";
      const res = await request(app).get(`/flag/${flaggedItemId}`);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Update a flagged user with id param', () => {
    test('Should return a 200 response, and the updated flagged user', async () => {
      const flaggedItemId = "63757381e88b97b9bbf6b7d0";
      const updatedFlag = {
        adminComment: "Flagged item is now marked for deletion.",
        markedForDeletion: true
      };
      const res = await request(app).patch(`/flag/${flaggedItemId}`).send(updatedFlag);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Delete a flag with id param', () => {
    test('Should return a 200 response, and the updated flagged user array', async () => {
      const flaggedItemId = "63757381e88b97b9bbf6b7d1";
      const res = await request(app).delete(`/flag/${flaggedItemId}`);
      expect(res.statusCode).toBe(200);
    });
  });
  