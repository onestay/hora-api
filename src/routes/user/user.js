const getRoute = require('./get');

class User {
	constructor(db) {
		this.db = db;

		this.get = this.get.bind(this);
	}

	get(req, res, next) {
		getRoute(req, res, next, this.db);
	}
}

module.exports = User;
