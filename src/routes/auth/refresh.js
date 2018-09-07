const errors = require('restify-errors');
const util = require('../../util');

module.exports = async (req, res, next, db) => {
	const { refreshToken } = req.body;

	try {
		const user = await db.models.user.findOne({ where: { refreshToken } });
		if (!user) {
			return next(new errors.InvalidCredentialsError('Invalid refresh token provided'));
		}

		const token = await util.genereateJWT(user);
		res.send({ token });
	} catch (error) {
		return next(new errors.InternalServerError('An error occured. Please try again later'));
	}

	return next();
};
