const errors = require('restify-errors');

module.exports = async (req, res, next, db) => {
	try {
		await db.models.user.create({
			id: 125,
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
		console.log(e);
		return next(new errors.InternalServerError('Something went wrong. Please try again later.'));
	}
	return next();
};
