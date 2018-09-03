const restify = require('restify');
const routes = require('./routes.js');

const server = restify.createServer({
	name: 'Hora',
});

routes.register(server);

module.exports.start = (config) => {
	server.listen(config.port || 3000, () => {
		config.log.info(`${server.name} started on ${server.url}`);
	});
};

module.exports.server = server;
