const UserModel = require('./user.js');
const EventModel = require('./event.js');

class Models {
	constructor(db) {
		this.user = UserModel(db);
		this.event = EventModel(db);
	}

	async initModels() {
		await this.user.sync();
		await this.event.sync({ force: true });
	}
}

module.exports = Models;
