const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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

	static genereateJWT(user) {
		return new Promise((resolve, reject) => {
			const {
				id, name, email,
			} = user;

			const sign = promisify(jwt.sign);
			sign({
				exp: Math.floor(Date.now() / 10000) + (10 * 60),
				data: { id, name, email },
			}, config.jwtSecret)
				.then(token => resolve(token))
				.catch(e => reject(e));
		});
	}
}

module.exports = Util;
