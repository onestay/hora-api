const authRoutes = require('./routes/auth/auth.js');

module.exports.register = (server) => {
	server.get('/register', authRoutes.register);
};
