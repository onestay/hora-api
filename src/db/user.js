const Sequilize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = db => db.define('user', {
	id: {
		type: Sequilize.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	name: {
		type: Sequilize.TEXT,
		allowNull: false,
		unique: true,
	},
	displayName: {
		type: Sequilize.TEXT,
		allowNull: false,
		unique: true,
		validate: {
			len: {
				msg: 'Username must be between 2 and 20 characters',
				args: [2, 20],
			},
			is: {
				msg: 'Username may only include alphanumeric characters and numbers',
				args: /^[a-z0-9]+$/i,
			},
		},
	},
	email: {
		type: Sequilize.TEXT,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: 'Not a valid E-Mail',
			},
		},
	},
	password: {
		type: Sequilize.TEXT,
		allowNull: false,
		validate: {
			min: {
				args: 6,
				msg: 'Password has to be at least 6 characters',
			},
		},
	},
	refreshToken: {
		type: Sequilize.TEXT,
	},
}, {
	hooks: {
		beforeValidate(user) {
			// eslint-disable-next-line
			user.name = user.displayName.toLowerCase();
		},
		afterValidate(user) {
			return new Promise((resolve, reject) => {
				bcrypt.hash(user.password, 14)
					.then((hash) => {
						// eslint-disable-next-line
						user.password = hash;
						resolve();
					})
					.catch(e => reject(e));
			});
		},
	},
});
