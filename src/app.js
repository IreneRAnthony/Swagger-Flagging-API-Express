const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const flagRoutes = require('./routes/flags');
const connectDb = require('../config/db');
require("dotenv").config();

const app = express();
connectDb(process.env.MONGO_URI);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/flag', flagRoutes);

module.exports = app;