const Sequilize = require('sequelize');

module.exports = db => db.define('event', {
	id: {
		type: Sequilize.TEXT,
		allowNull: false,
		primaryKey: true,
		unique: true,
		validate: {
			isAlphanumeric: {
				msg: 'The event ID has to be alphanumeric',
			},
			len: {
				args: [2, 20],
				msg: 'Event ID has to be between 2 and 20 characters',
			},
		},
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
		validate: {
			isUrl: {
				msg: 'Website has to be an URL',
			},
		},
	},
	stream: {
		type: Sequilize.TEXT,
		validate: {
			isUrl: {
				msg: 'Stream has to be an URL',
			},
		},
	},
	twitter: {
		type: Sequilize.TEXT,
	},
	discord: {
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
