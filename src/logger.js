const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'API-logging',
    streams: [
        {
            level: "info",
            stream: process.stdout 
        }
    ]
});

module.exports = logger;