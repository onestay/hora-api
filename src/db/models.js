const UserModel = require('./user.js');

class Models {
	constructor(db) {
		this.user = UserModel(db);
	}

	async initModels() {
		await this.user.sync();
	}
}

module.exports = Models;
