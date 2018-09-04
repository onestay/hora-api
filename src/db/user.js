const Sequilize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = db => db.define('user', {
	id: {
		type: Sequilize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequilize.TEXT,
		allowNull: false,
	},
	displayName: {
		type: Sequilize.TEXT,
		allowNull: false,
		validate: {
			len: {
				msg: 'Must be between 2 and  20 characters',
				args: [2, 20],
			},
			is: {
				msg: 'Only alphanumeric characters and numbers allowed',
				args: /^[a-z0-9]+$/i,
			},
		},
	},
	email: {
		type: Sequilize.TEXT,
		allowNull: false,
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
				msg: 'Password needs at least 6 letters',
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
		async beforeCreate(user) {
			// eslint-disable-next-line
			user.password = await bcrypt.hash(user.password, 14);
		},
	},
});
