const restify = require('restify');

class Server {
	constructor(config) {
		this.server = restify.createServer({
			name: 'Hora',
		});

		this.server.use(restify.plugins.bodyParser());

		this.config = config;
		this.routes = {};
	}

	start() {
		this.server.listen(this.config.port || 3000, () => {
			this.config.log.info(`${this.server.name} started on ${this.server.url}`);
		});
	}
}

module.exports = Server;
