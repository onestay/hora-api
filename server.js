const restify = require('restify');

const server = restify.createServer({
	name: 'Hora',
});


module.exports = (config) => {
	server.listen(config.port || 3000, () => {
		config.log.info(`${server.name} started on ${server.url}`);
	});
};
