const errors = require('restify-errors');
const sequelize = require('sequelize');

module.exports = async (req, res, next, db) => {
	try {
		const event = await db.models.event.findOne({
			where: { id: req.query.id },
			include: [db.models.user],
		});
		if (!event) {
			return next(new errors.NotFoundError('No event with provided ID found'));
		}
		// TODO: omit sensetive values, like password from user
		res.send(event);
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}
		console.log(e);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}

	return next();
};
