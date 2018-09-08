const errors = require('restify-errors');
const sequelize = require('sequelize');

module.exports = async (req, res, next, db) => {
	try {
		req.body.owner = req.user.id;
		const event = await db.models.event.create(req.body);
		res.send({ event });
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}
		console.log(e);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}

	return next();
};
