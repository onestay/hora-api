const winston = require('winston');
const Server = require('./server.js');
const config = require('../config.json');
const DB = require('./db/db.js');
const Routes = require('./routes.js');

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

const server = new Server(config);
server.start();

const db = new DB(config);
db.connect();

const routes = new Routes(server, db);
routes.register();
