const errors = require('restify-errors');
const sequelize = require('sequelize');
const config = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		const event = await db.models.event.findOne({
			where: { id: req.query.id },
			attributes: { exclude: ['owner'] }, // we don't really need the owner since we give back the user object
			include: [{
				model: db.models.user,
				attributes: ['id', 'displayName', 'name'],
			}],
		});
		if (!event) {
			return next(new errors.NotFoundError('No event with provided ID found'));
		}
		res.send(event);
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}
		config.log.error(`Error in event get function: ${e}`);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}

	return next();
};
