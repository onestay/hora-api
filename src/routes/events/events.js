const createRoute = require('./create');
const getRoute = require('./get');

class Events {
	constructor(db) {
		this.db = db;

		this.create = this.create.bind(this);
		this.get = this.get.bind(this);
	}

	create(req, res, next) {
		createRoute(req, res, next, this.db);
	}

	get(req, res, next) {
		getRoute(req, res, next, this.db);
	}
}

module.exports = Events;
