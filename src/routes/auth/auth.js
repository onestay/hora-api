const registerRoute = require('./register');
const loginRoute = require('./login');

class Auth {
	constructor(db) {
		this.db = db;

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
	}

	register(req, res, next) {
		registerRoute(req, res, next, this.db);
	}

	login(req, res, next) {
		loginRoute(req, res, next, this.db);
	}
}

module.exports = Auth;
