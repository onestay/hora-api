const uuid = require('uuid/v4');
const config = require('../config.json');

const ID_LOWER_LIMIT = 100000;
const ID_UPPER_LIMIT = 999999;


class Util {
	static generateUserID() {
		return Math.floor(Math.random() * (ID_UPPER_LIMIT - ID_LOWER_LIMIT)) + ID_LOWER_LIMIT;
	}

	static genereateRefreshToken() {
		return uuid();
	}
}

module.exports = Util;
