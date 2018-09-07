const Sequilize = require('sequelize');

module.exports = db => db.define('event', {
	id: {
		type: Sequilize.TEXT,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	owner: {
		type: Sequilize.INTEGER,
		allowNull: false,
	},
	name: {
		type: Sequilize.TEXT,
		allowNull: false,
	},
	website: {
		type: Sequilize.TEXT,
	},
	stream: {
		type: Sequilize.TEXT,
		validate: {
			isUrl: {
				msg: 'Stream has to be a URL',
			},
		},
	},
	twitter: {
		type: Sequilize.TEXT,
	},
	private: {
		type: Sequilize.BOOLEAN,
	},
	secret: {
		type: Sequilize.TEXT,
		validate: {
			max: {
				args: 15,
				msg: 'Secret shouldn\'t be longer than 15 character',
			},
		},
	},
	allowedUsers: {
		type: Sequilize.ARRAY(Sequilize.TEXT),
	},
});
