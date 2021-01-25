const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const { expect } = chai;

let id;
let deletedId;

describe("Setup the database for tests", () => {
  it("It should set 2 notes inside the database", (done) => {
    chai
      .request(server)
      .get("/api/setup")
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response).to.be.an("object");
        expect(response.body.success).to.be.eq(true);
        done();
      });
  });
});
//GET notes
describe("GET all not deleted notes", () => {
  it("It should get not deleted notes", (done) => {
    chai
      .request(server)
      .get("/api/notes")
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response).to.be.an("object");
        expect(response.body.success).to.be.eq(true);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.haveOwnProperty("_id");
        id = response.body.data[0]._id;
        done();
      });
  });
});
//GET deleted notes
describe("GET all deleted notes", () => {
  it("It should get all deleted notes", (done) => {
    chai
      .request(server)
      .get("/api/deleted")
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response).to.be.an("object");
        expect(response.body.success).to.be.eq(true);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.haveOwnProperty("_id");
        deletedId = response.body.data[0]._id;
        done();
      });
  });
});
//GET note by id
describe("GET note by id", () => {
  it("Is should get note by id", (done) => {
    chai
      .request(server)
      .get(`/api/note/${id}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response).to.be.an("object");
        expect(response.body.success).to.be.eq(true);
        expect(response.body.data).to.be.an("object");
        expect(response.body.data).to.haveOwnProperty("_id");
        done();
      });
  });
});
//GET deleted note by id
describe("GET deleted note by id", () => {
  it("It should get deleted note by id", (done) => {
    chai
      .request(server)
      .get(`/api/history/${deletedId}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response).to.be.an("object");
        expect(response.body.success).to.be.eq(true);
        expect(response.body.data).to.be.an("object");
        expect(response.body.data).to.haveOwnProperty("_id");
        done();
      });
  });
});
//PUT update a note by id
describe("UPDATE note by id", () => {
  it("It should update a note", (done) => {
    chai
      .request(server)
      .put(`/api/note/${id}`)
      .send({
        title: "Title set during testing",
        content: "Content set during testing",
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response.body.success).to.be.eq(true);
        done();
      });
  });
});
//DELETE a note by id
describe("DELETE note by id", () => {
  it("It should mark note as deleted", (done) => {
    chai
      .request(server)
      .delete(`/api/note/${id}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(200);
        expect(response.body.success).to.be.eq(true);
        done();
      });
  });
});
//POST create a new note
describe("CREATE note", () => {
  it("It should create a new note", (done) => {
    chai
      .request(server)
      .post(`/api/note`)
      .send({
        title: "New note created during testing",
        content: "Content of the note",
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(201);
        expect(response.body.success).to.be.eq(true);
        done();
      });
  });
});
//POST missing parameter
describe("CREATE note with missing parameter", () => {
  it("It should not create note (missing params)", (done) => {
    chai
      .request(server)
      .post(`/api/note`)
      .send({
        content: "Content of the note",
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(400);
        expect(response.body.success).to.be.eq(false);
        done();
      });
  });
});
