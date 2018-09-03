const winston = require('winston');
const server = require('./server.js');
const config = require('../config.json');
const db = require('./db/db.js');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
		new winston.transports.Console({
			format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
		}),
	],
});

config.log = logger;

db.connect(config);
server.start(config);
