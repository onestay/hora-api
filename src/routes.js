const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const errors = require('restify-errors');
const { config } = require('./config');

const AuthRoutes = require('./routes/auth/auth');
const EventRoutes = require('./routes/events/events');

class Routes {
	constructor(server, db) {
		this.db = db;
		this.server = server.server;
		this.authRoutes = new AuthRoutes(this.db);
		this.eventRoutes = new EventRoutes(this.db);
	}

	register() {
		this.server.post('/auth/register', this.authRoutes.register);
		this.server.post('/auth/login', this.authRoutes.login);
		this.server.post('/auth/refresh', this.authRoutes.refresh);
		this.server.post('/auth/invalidate', this.checkAuth, this.authRoutes.invalidate);
		this.server.post('/auth/verify', this.checkAuth, this.authRoutes.verify);

		this.server.post('/event/create', this.checkAuth, this.eventRoutes.create);
		this.server.get('/event', this.eventRoutes.get);
		this.server.patch('/event/edit', this.checkAuth, this.eventRoutes.edit);
		this.server.del('/event', this.checkAuth, this.eventRoutes.delete);
	}

	async checkAuth(req, res, next) {
		const token = req.header('Authorization', '').slice(7);
		if (token.length === 0) {
			return next(new errors.UnauthorizedError('No token provided'));
		}

		const verify = promisify(jwt.verify);
		try {
			const { data } = await verify(token, config.jwtSecret);
			req.user = data;
		} catch (error) {
			if (error.name) {
				return next(new errors.UnauthorizedError(`JWT Token error: ${error.message}`));
			}
			config.log.error(`An error occured during checkAuth: ${error}`);
			return next(new errors.InternalServerError('An error occured. Please try again later'));
		}
		return next();
	}
}

module.exports = Routes;
