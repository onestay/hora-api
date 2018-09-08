const UserModel = require('./user.js');
const EventModel = require('./event.js');

class Models {
	constructor(db) {
		this.user = UserModel(db);
		this.event = EventModel(db);
	}

	async initModels() {
		await this.user.sync();
		await this.event.sync();

		this.user.hasMany(this.event, { foreignKey: 'owner', sourceKey: 'id' });
		this.event.belongsTo(this.user, { foreignKey: 'owner' });
	}
}

module.exports = Models;
