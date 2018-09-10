const winston = require('winston');
const Server = require('./server.js');
const DB = require('./db/db.js');
const Routes = require('./routes.js');
const config = require('./config.js');

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
config(logger);

const server = new Server(config.config);
const db = new DB(config.config);
const routes = new Routes(server, db);

// if we are testing the db connection and routes are initialized in with mocha
if (process.env.NODE_ENV !== 'test') {
	db.connect();
	routes.register();
}

server.start();

module.exports.serverObject = server;
module.exports.server = server.server;
