const config = require('../config.json');

module.exports = (logger) => {
	config.log = logger;
};

module.exports.config = config;
