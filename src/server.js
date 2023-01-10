const logger = require('./logger.js');
const app = require('./app.js');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerJsDocOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Swagger Flagging System",
            description: "An API for flagging users and items"
        }
    },
    apis: ["src/routes/*.js"]
};

const specs = swaggerJsdoc(swaggerJsDocOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.port || 3000;
app.listen(port);

logger.info(`Server listening on port ${port}`);
process.env.LOG_LEVEL === 'debug' && log.debug(`Debug activated`);