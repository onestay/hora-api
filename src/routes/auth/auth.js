const registerRoute = require('./register');
const loginRoute = require('./login');
const refreshRoute = require('./refresh');
const invalidateRoute = require('./invalidate');
const verifyRoute = require('./verify');

class Auth {
	constructor(db) {
		this.db = db;

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.refresh = this.refresh.bind(this);
		this.invalidate = this.invalidate.bind(this);
		this.verify = this.verify.bind(this);
	}

	register(req, res, next) {
		registerRoute(req, res, next, this.db);
	}

	login(req, res, next) {
		loginRoute(req, res, next, this.db);
	}

	refresh(req, res, next) {
		refreshRoute(req, res, next, this.db);
	}

	invalidate(req, res, next) {
		invalidateRoute(req, res, next, this.db);
	}

	verify(req, res, next) {
		verifyRoute(req, res, next, this.db);
	}
}

module.exports = Auth;
