const errors = require('restify-errors');
const { config } = require('../../config');

module.exports = async (req, res, next, db) => {
	try {
		const user = await db.models.user.findOne({ where: { id: req.user.id } });
		if (!user) {
			return next(new errors.InvalidContentError('User not found'));
		}

		res.send({
			id: user.id,
			displayName: user.displayName,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		config.log.error(`Error in verify function: ${error}`);
		return next(new errors.InternalServerError('An error occured. Please try again later'));
	}

	return next();
};
