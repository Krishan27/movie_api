
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../index');
const movieController =require('../../../controllers/movieController')
const conn = require('../../../services/testing');

describe('GET /omdb', () => {
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
  // it('OK, getting movies from omdb', async () => {
  //   const result = await request(movieController).get('/omdb')
  //   expect(result).to.equal(0); 
  // });
  // it('OK, getting movies from omdb', (done) => {
  //   request(movieController).get('/omdb')
  //     .then((res) => {
  //       const body = res.body;
  //       expect(body.length).to.equal(0);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  it('resolves', (done) => {
    request(movieController).get('/omdb').then( (result) => {
    expect(result).to.equal(0);
    }).then(done, done);
    });

    it('resolves', () => {
      return request(movieController).get('/omdb').then( (result) => {
      expect(result).to.equal(1);
      });
      });


  // it('OK, getting movies atleast 1', async () => {
  //     var name = 'guardians'
  //      const response = await request(movieController).get('/omdb')
  //      return res.status(200).json({
  //      data: response
  //  });
     
  });
//   it('OK, getting movies atleast 1', (done) => {
//     request(movieController).get('/omdb')
//       .send({ name: 'guardians' })
//       .then((res) => {
//         request(movieController).get('/omdb')
//           .then((res) => {
//             const body = res.body;
//             expect(body.length).to.equal(1);
//             done();
//           })
//       })
//       .catch((err) => done(err));
//   });
// })