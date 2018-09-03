const winston = require('winston');
const server = require('./server.js');
const config = require('../config.json');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
		new winston.transports.Console({ format: winston.format.simple() }),
	],
});

config.log = logger;

server.start(config);
