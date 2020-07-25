process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../../index');
const movieController =require('../../../controllers/movieController')
const conn = require('../../../services/testing');

describe('PUT /wishlist/:user', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, creating a movie in the database', (done) => {
    this.timeout(15000);
    request(movieController).put('/wishlist/:user')
      .send({ wishlist: ["lagaan","dhoom"]})
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('status');
        expect(body).to.contain.property('data');
        expect(body).to.contain.property('_id');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, note requires text', (done) => {
    request(movieController).post('/wishlist/:user')
      .send({ wishlist: '[]' })
      .then((res) => {
        const body = res.body;
        expect(body.errors.text.name)
          .to.equal('ValidatorError')
        done();
      })
      .catch((err) => done(err));
  });
})