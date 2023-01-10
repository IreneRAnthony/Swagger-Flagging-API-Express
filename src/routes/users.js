const logger = require('../logger.js');
const express = require('express');
const router  = express.Router();

const { getAllUsers, getSpecificUser, createUser, updateUser, deleteUser } = require('../../controllers/user.controller');

/**
 * @swagger
 * /user:
 *   get:
 *     responses:
 *      '200':
 *        description: Fetch all users
 *      '400':
 *        description: Unable to process fetch request
 *              
 */
  router.get('/', async (req, res) => {
    logger.debug('Handling request for endpoint: GET /user');
    let response = await getAllUsers();
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /user:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: Create a new user
 *        schema:
 *          type: object
 *          required: [email, password]
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *          description: Unable to create user
 */
  router.post('/', async (req, res) => {
    logger.debug('Handling request for endpoint: POST /user');
    let response = await createUser(req.body);
    if(response.success === true) {
       res.status(201).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /user/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 *       400: 
 *         description: Unable to process fetch request
 */
  router.get('/:id', async (req, res) => {
   logger.debug('Handling request for endpoint: GET /user/:id');
   let response = await getSpecificUser(req.params.id);
   if(response.success === true) {
       res.status(200).json(response);
   } else {
       res.status(400).json(response);
   }
  });
 
  /**
 * @swagger
 * /user/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID
 *      - in: body
 *        name: user
 *        description: Update the user
 *        schema:
 *          type: object
 *          properties:
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Updated user successfully
 *       400:
 *         description: Unable to process patch request
 */
  router.patch('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: PATCH /user/:id');
    let response = await updateUser(req.params.id, req.body);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });
 
  /**
 * @swagger
 * /user/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The flag ID.
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: Flag deleted successfully
 *       400: 
 *         description: Unable to process delete request
 */
  router.delete('/:id', async (req, res) => {
    logger.debug('Handling request for endpoint: DELETE /user/:id');
    let response = await deleteUser(req.params.id);
    if(response.success === true) {
       res.status(200).json(response);
    } else {
       res.status(400).json(response);
    };
  });

  module.exports = router;