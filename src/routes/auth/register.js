const errors = require('restify-errors');
const sequelize = require('sequelize');
const util = require('../../util');

module.exports = async (req, res, next, db) => {
	const id = util.generateUserID();
	const refreshToken = util.genereateRefreshToken();
	try {
		const token = await util.genereateJWT({ id, name: req.body.name, email: req.body.email });

		await db.models.user.create({
			id,
			displayName: req.body.name,
			email: req.body.email,
			password: req.body.password,
			refreshToken,
		});
		res.send({
			id,
			refreshToken,
			token,
			displayName: req.body.name,
			name: req.body.name.toLowerCase(),
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
