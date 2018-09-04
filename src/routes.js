const AuthRoutes = require('./routes/auth/auth.js');

class Routes {
	constructor(server, db) {
		this.db = db;
		this.server = server.server;
		this.authRoutes = new AuthRoutes(this.db);
	}

	register() {
		this.server.post('/register', this.authRoutes.register);
		this.server.get('/login', this.authRoutes.login);
	}
}

module.exports = Routes;
