const Sequelize = require('sequelize');
const Models = require('./models.js');

class DB {
	constructor(config) {
		this.config = config;
		this.sequelize = {};
		this.models = {};
	}

	async connect() {
		this.sequelize = new Sequelize(
			this.config.db.database,
			this.config.db.username,
			this.config.db.password,
			{
				host: this.config.db.host,
				dialect: this.config.db.dialect || 'postgres',
				operatorsAliases: false,
				logging: false,
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
			},
		);

		this.models = new Models(this.sequelize);

		try {
			await this.sequelize.authenticate();
			this.config.log.info('DB Connection established');
			await this.models.initModels(this.sequelize);
			this.config.log.info('Models created and synced');
		} catch (error) {
			this.config.log.error(`Error while initalizing DB.\nError: ${error}`);
		}
	}
}


module.exports = DB;
