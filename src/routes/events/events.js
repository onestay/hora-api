const createRoute = require('./create');
const getRoute = require('./get');
const editRoute = require('./edit');
const deleteRoute = require('./delete');

class Events {
	constructor(db) {
		this.db = db;

		this.create = this.create.bind(this);
		this.get = this.get.bind(this);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
	}

	create(req, res, next) {
		createRoute(req, res, next, this.db);
	}

	get(req, res, next) {
		getRoute(req, res, next, this.db);
	}

	edit(req, res, next) {
		editRoute(req, res, next, this.db);
	}

	delete(req, res, next) {
		deleteRoute(req, res, next, this.db);
	}
}

module.exports = Events;
