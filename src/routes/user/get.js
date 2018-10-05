const errors = require('restify-errors');
const sequelize = require('sequelize');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		let user;
		if (req.user) {
			user = await db.models.user.findOne({
				where: { id: req.user.id },
				attributes: { exclude: ['updatedAt', 'refreshToken', 'password'] },
				include: [{
					models: db.models.event,
					attributes: { exclude: ['owner'] },
				}],
			});
		} else if (req.query.name) {
			user = await db.models.user.findOne({
				where: { name: req.query.name.toLowerCase() },
				attributes: { exclude: ['updatedAt', 'refreshToken', 'password', 'email'] },
				include: [{
					model: db.models.event,
					attributes: { exclude: ['owner'] },
				}],
			});
		} else {
			return next(new errors.BadRequestError('user query or Authorization header missing'));
		}
		if (!user) {
			return next(new errors.NotFoundError('no user found'));
		}
		res.send(user);
		return next();
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}
		config.log.error(`Error in event get function: ${e}`);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}
};
