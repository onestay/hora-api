const Sequilize = require('sequelize');

function userModel(db) {
	return db.define('user', {
		id: {
			type: Sequilize.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: Sequilize.TEXT,
			allowNull: false,
			set(val) {
				this.setDataValue('name', val.toLowerCase());
			},
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
		},
		joinDate: {
			type: Sequilize.DATE,
			defaultValue: Sequilize.NOW,
		},
	});
}

module.exports.initModels = async (db) => {
	const user = userModel(db);
	await user.sync();
	module.exports.User = user;
};
