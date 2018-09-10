/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../src/index');

// eslint-disable-next-line
const should = chai.should();

chai.use(chaiHttp);

describe('/GET event', () => {
	it('it should GET an event', (done) => {
		chai.request(server)
			.get('/event?id=gdq')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
