const errors = require('restify-errors');
const bcrypt = require('bcrypt');
const util = require('../../util');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	const { username, password } = req.body;
	try {
		const user = await db.models.user.findOne({ where: { name: username.toLowerCase() } });
		if (!user) {
			return next(new errors.NotFoundError('No user with that username'));
		}

		const passCheck = await bcrypt.compare(password, user.password);
		if (!passCheck) {
			return next(new errors.InvalidCredentialsError('Wrong password'));
		}

		if (!user.refreshToken) {
			const refreshToken = util.genereateRefreshToken();
			user.refreshToken = refreshToken;
			user.update({ refreshToken });
		}

		const token = await util.genereateJWT(user);

		res.send({
			id: user.id,
			refreshToken: user.refreshToken,
			token,
			displayName: user.displayName,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		config.log.error(`Error in login function: ${error}`);
		return next(new errors.InternalServerError('An error occured. Please try again later'));
	}

	return next();
};
