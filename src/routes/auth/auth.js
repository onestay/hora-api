const auth = {};

auth.register = (req, res, next) => {
	res.send('hello world');
	next();
};

module.exports = auth;
