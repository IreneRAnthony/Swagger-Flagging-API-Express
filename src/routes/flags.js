const logger = require('../logger.js');
const express = require('express');
const router  = express.Router();

const { getAllFlaggedItems, getAllFlaggedUsers, getAllFlaggedProjects, getSpecificFlaggedItem, createFlaggedItem, updateFlaggedItem, deleteFlaggedItem } = require('../../controllers/flag.controller');

/**
 * @swagger
 * /flag:
 *   get:
 *     responses:
 *      '200':
 *        description: Retrieve all flagged items
 *      '400':
 *        description: Unable to process get request
 *              
 */
router.get('/', async (req, res) => {
    logger.debug('Handling request for endpoint: GET /flag');
    let response = await getAllFlaggedItems();
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(404).json(response);
    };
  });

  /**
 * @swagger
 * /flag/projects:
 *   get:
 *     responses:
 *      '200':
 *        description: Retrieve all flagged projects
 *      '400':
 *        description: Unable to process get request
 *              
 */
router.get('/projects', async(req, res) => {
   logger.debug('Handling request for endpoint: GET /flag/projects');
   let response = await getAllFlaggedProjects();
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(404).json(response);
    };
});

/**
 * @swagger
 * /flag/users:
 *   get:
 *     responses:
 *      '200':
 *        description: Retrieve all flagged users
 *      '400':
 *        description: Unable to process get request
 *              
 */
router.get('/users', async(req, res) => {
   logger.debug('Handling request for endpoint: GET /flag/users');
   let response = await getAllFlaggedUsers();
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(404).json(response);
    };
});

  /**
 * @swagger
 * /flag:
 *   post:
 *     parameters:
 *      - in: body
 *        name: flag
 *        description: A new flag for a item or user
 *        schema:
 *          type: object
 *          required: [flaggedItemId, flaggedItemType, markedForDeletion]
 *          properties:
 *            flaggedItemId:
 *              type: string
 *            flaggedItemType:
 *              type: string
 *              enum: ["project", "comment", "recommendation", "user"]
 *            comment:
 *              type: string
 *            adminComment:
 *              type: string
 *            markedForDeletion:
 *              type: boolean
 *              defaultValue: false
 *     responses:
 *       201:
 *         description: Flag successfully created
 *       400:
 *         description: Unable to create flag
 */
  router.post('/', async (req, res) => {
    logger.debug('Handling request for endpoint: POST /flag');
    let response = await createFlaggedItem(req.body);
    if(response.success === true) {
       res.status(201).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
/**
 * @swagger
 * /flag/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The flagged item ID.
 *     description: Get a flagged item by id
 *     responses:
 *       200:
 *         description: Returns the requested flagged item
 */
  router.get('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: GET /flag/:id');
    let response = await getSpecificFlaggedItem(req.params.id);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /flag/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The flagged item ID
 *      - in: body
 *        name: flag
 *        description: Update flagged item
 *        schema:
 *          type: object,
 *          required: [flaggedItemId, flaggedItemType, markedForDeletion]
 *          properties:
 *            flaggedItemId:
 *              type: string
 *            flaggedItemType:
 *              type: string
 *              enum: ["project", "comment", "recommendation", "user"]
 *            comment:
 *              type: string
 *            adminComment:
 *              type: string
 *            markedForDeletion:
 *              type: boolean
 *     responses:
 *       200:
 *         description: Updated flag successfully
 */
  router.patch('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: PUT /flag/:id');
    let response = await updateFlaggedItem(req.params.id, req.body);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /flag/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The flag ID.
 *     description: Delete a flagged item by id
 *     responses:
 *       200:
 *         description: Flag deleted successfully
 */
  router.delete('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: DELETE /flag/:id');
    let response = await deleteFlaggedItem(req.params.id);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });

  module.exports = router;