/* eslint-env node, mocha */

const { serverObject } = require('../src/index');
const config = require('../config_test.json');
const DB = require('../src/db/db');
const Routes = require('../src/routes.js');

before((done) => {
	const db = new DB(config);
	const routes = new Routes(serverObject, db);
	db.connect()
		.then(() => routes.register())
		.then(() => done());
});
