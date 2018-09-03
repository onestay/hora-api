const Sequelize = require('sequelize');
const models = require('./models.js');

let sequelize;

module.exports.connect = async (config) => {
	sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
		host: config.db.host,
		dialect: config.db.dialect || 'postgres',
		operatorsAliases: false,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	});

	try {
		await sequelize.authenticate();
		config.log.info('DB Connection established');
		await models.initModels(sequelize);
		config.log.info('Models created and synced');
	} catch (error) {
		config.log.error(`Error while initalizing DB.\nError: ${error}`);
	}
};

module.exports.db = sequelize;
