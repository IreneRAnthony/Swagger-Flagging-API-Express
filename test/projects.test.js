const request = require('supertest');
const app = require('../src/app');

// If tests fail, please check that:
// - Finding a specific project and updating it has a valid id
// - Deleting a project has a valid id (This will actually delete the project from the DB)

describe('Get all the projects', () => {
    test('Should return a 200 response, and a array of all projects', async () => {
      const res = await request(app).get('/project');
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Create a new project', () => {
    test('Should return a 201 response, and the created project', async () => {
      const newProject = {
        title: "Test",
        owner: "637807a86653e80094a987e1",
        details: "Testing jest testing.",
      };
      const res = await request(app).post('/project').send(newProject);
      expect(res.statusCode).toBe(201);
    });
  });
  
  describe('Try to create a new project with missing fields', () => {
    test('Should return a 405 error', async () => {
      const newProject = {
        title: "Test"
      };
      const res = await request(app).post('/project').send(newProject);
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('Get a project with id param', () => {
    test('Should return a single project, with matching id to param', async () => {
      const projectId = "637572c9e88b97b9bbf6b7c4";
      const res = await request(app).get(`/project/${projectId}`);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Update the existing project with matching id', () => {
    test('Should return a 200 response, and the updated project', async () => {
      const projectId = "63780c851b3817ebb92e07a9";
      const updatedProject = {
        details: "Testing jest testing."
      };
      const res = await request(app).patch(`/project/${projectId}`).send(updatedProject);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe('Delete a project with the id param', () => {
    test('Should return a 200 response, and the updated project list', async () => {
      const projectId = "637572c9e88b97b9bbf6b7c3";
      const res = await request(app).delete(`/project/${projectId}`);
      expect(res.statusCode).toBe(200);
    });
  });