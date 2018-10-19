'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../knex');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Static Server', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('Noteful API', function () {
  const seedData = require('../db/seedData');

  beforeEach(function () {
    return seedData('./db/noteful-app.sql');
  });

  after(function () {
    return knex.destroy(); // destroy the connection
  });

  describe('GET /api/notes', function () {

    it('should return the default of 10 Notes ', function () {
      return chai.request(app)
        .get('/api/notes')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
        });
    });

    it('should return correct search results for a valid searchTerm', function () {
      return chai.request(app)
        .get('/api/notes?searchTerm=about%20cats')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(4);
          expect(res.body[0]).to.be.an('object');
        });
    });

  });

  /*========== #1 - 404 HANDLER TEST ==========*/
  describe('404 handler', function () {

    it('should respond with 404 when given a bad path', function () {
      return chai.request(app)
        .get('/api/badpathrequest')
        .then(function (res) {
          expect(res).to.have.status(404);
        });
    });

  });

  // /*========== #2 ==========*/
  describe('GET /api/notes', function () {

    it('should return an array of objects where each item contains id, title, and content', function () {
      return chai.request(app)
        .get('/api/notes')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          const expectedKeys = ['id', 'title', 'content'];
          res.body.forEach(function(item) {
            expect(item).to.be.a('object');
            expect(item).to.include.keys(expectedKeys);
          });
        });
    });

    it('should return an empty array for an incorrect searchTerm', function () {
      let searchTerm = 'testvalue';
      return chai.request(app)
        .get(`/api/notes?searchTerm=${searchTerm}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
        });
    });

  });

  // /*========== #3 ==========*/
  describe('GET /api/notes/:id', function () {
    const testId = 1000;
    const badId = 2000;
    it('should return correct note when given an id', function () {
      return chai.request(app)
        .get(`/api/notes/${testId}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.an('object');
          expect(res.body).to.include({id: testId});
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      return chai.request(app)
        .get(`/api/notes/${badId}`)
        .then(function (res) {
          expect(res).to.have.status(404);
        });
    });

  });

  // /*========== #4 ==========*/
  describe('POST /api/notes', function () {
    const testNote = { title: 'test title', content: 'test content', folderId: '101', tags: [1,2,3] };
    const badNote = { title: '', content: 'test content', folderId: '101', tags: [1,2,3] };
    it('should create and return a new item when provided valid data', function () {
      return chai.request(app)
        .post('/api/notes')
        .send(testNote)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'title', 'content');
        });
    });

    it('should return an error when missing "title" field', function () {
      return chai.request(app)
        .post('/api/notes')
        .send(badNote)
        .then(function(res) {
          expect(res).to.have.status(400);
          expect(new Error).to.be.an('error');
        });
    });

  });

  // /*========== #5 ==========*/
  // describe('PUT /api/notes/:id', function () {

  //   it('should update the note', function () {

  //   });

  //   it('should respond with a 404 for an invalid id', function () {

  //   });

  //   it('should return an error when missing "title" field', function () {

  //   });

  // });

  // /*========== #6 ==========*/
  // describe('DELETE  /api/notes/:id', function () {

  //   it('should delete an item by id', function () {

  //   });

  // });


});