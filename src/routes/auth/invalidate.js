const errors = require('restify-errors');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		const user = await db.models.user.findOne({ where: { name: req.username } });
		if (!user) {
			return next(new errors.InvalidContentError('User not found'));
		}

		await user.update({ refreshToken: null });
		res.send(204);
	} catch (error) {
		config.log.error(`Error in invalidate function: ${error}`);
		return next(new errors.InternalServerError('An error occured. Please try again later'));
	}

	return next();
};
