const errors = require('restify-errors');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		const event = await db.models.event.findOne({ where: { id: req.query.id } });
		if (!event) {
			return next(new errors.NotFoundError('No event with that ID'));
		}

		if (event.owner !== req.user.id) {
			return next(new errors.ForbiddenError('You don\'t have permission to delete this event'));
		}

		await event.destroy();

		res.send(204);
	} catch (e) {
		config.log.error(`Error in event edit function: ${e}`);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}

	return next();
};
