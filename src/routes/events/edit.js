const errors = require('restify-errors');
const sequelize = require('sequelize');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		let event = await db.models.event.findOne({ where: { id: req.query.id } });
		if (!event) {
			return next(new errors.NotFoundError('No event with that ID'));
		}

		if (event.owner !== req.user.id) {
			return next(new errors.ForbiddenError('You don\'t have permission to edit this event'));
		}

		if (req.body.id && event.id !== req.body.id) {
			return next(new errors.InvalidContentError('Event ID can\'t be edited'));
		}

		event = await event.update(req.body);

		res.send(event);
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}

		config.log.error(`Error in event edit function: ${e}`);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}

	return next();
};
