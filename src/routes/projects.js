const logger = require('../logger.js');
const express = require('express');
const router  = express.Router();

const { getAllProjects, getSpecificProject, createProject, updateProject, deleteProject } = require('../../controllers/project.controller');

/**
 * @swagger
 * /project:
 *   get:
 *     responses:
 *      '200':
 *        description: Fetch all projects
 *      '400':
 *        description: Unable to process fetch request
 *              
 */
router.get('/', async (req, res) => {
    logger.debug('Handling request for endpoint: GET /project');
    let response = await getAllProjects();
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /project:
 *   post:
 *     parameters:
 *      - in: body
 *        name: project
 *        description: Create a new project
 *        schema:
 *          type: object
 *          required: [title, owner]
 *          properties:
 *            title:
 *              type: string
 *            owner:
 *              type: string
 *            details:
 *              type: string
 *     responses:
 *       201:
 *         description: Project successfully created
 *       400:
 *          description: Unable to create project
 */
  router.post('/', async (req, res) => {
    logger.debug('Handling request for endpoint: POST /project');
    let response = await createProject(req.body);
    if(response.success === true) {
       res.status(201).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /project/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The project ID.
 *     description: Get a project by id
 *     responses:
 *       200:
 *         description: Returns the requested project
 *       400: 
 *         description: Unable to process fetch request
 */
  router.get('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: GET /project/:id');
    let response = await getSpecificProject(req.params.id);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /project/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The project ID
 *      - in: body
 *        name: project
 *        description: Update the project
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            details:
 *              type: string
 *     responses:
 *       200:
 *         description: Updated project successfully
 *       400:
 *         description: Unable to process patch request
 */
  router.patch('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: PATCH /project/:id');
    let response = await updateProject(req.params.id, req.body);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /project/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The project ID.
 *     description: Delete a project by id
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Unable to process delete request
 */
  router.delete('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: DELETE /project/:id');
    let response = await deleteProject(req.params.id);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });

  module.exports = router;