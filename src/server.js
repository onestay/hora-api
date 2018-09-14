const restify = require('restify');
const errors = require('restify-errors');

class Server {
	constructor(config) {
		this.server = restify.createServer({
			name: 'Hora',
		});

		this.server.use(restify.plugins.bodyParser());
		this.server.use(restify.plugins.queryParser());
		this.server.use(restify.plugins.acceptParser(this.server.acceptable));
		this.server.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			next();
		});
		this.server.on('MethodNotAllowed', this.unknownMethod);
		this.config = config;
		this.routes = {};
	}

	start() {
		this.server.listen(this.config.port || 3000, () => {
			this.config.log.info(`${this.server.name} started on ${this.server.url}`);
		});
	}

	unknownMethod(req, res) {
		if (req.method.toLowerCase() === 'options') {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			res.send(200);
		} else {
			res.send(new errors.MethodNotAllowedError(`${req.method} is not allowed`));
		}
	}
}

module.exports = Server;
