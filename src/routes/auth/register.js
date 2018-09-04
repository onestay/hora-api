const errors = require('restify-errors');
const sequelize = require('sequelize');

module.exports = async (req, res, next, db) => {
	try {
		await db.models.user.create({
			id: 12234,
			displayName: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res.send({
			id: 125,
			displayName: req.body.name,
			email: req.body.email,
		});
	} catch (e) {
		if (e instanceof sequelize.ValidationError) {
			return next(new errors.InvalidContentError(e.errors.map(error => error.message).join(', ')));
		}
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}
	return next();
};
