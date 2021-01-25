const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const { expect } = chai;

let id;
let deletedId;

describe("API CALLS TESTING", () => {
  describe("#Setup the database for tests", () => {
    it("should set without error", (done) => {
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
  describe("#GET /notes", () => {
    it("should get notes", (done) => {
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
  describe("#GET /deleted", () => {
    it("should get deleted notes", (done) => {
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
  describe("#GET /note/:id", () => {
    it("should get note by id", (done) => {
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
  describe("#GET /note/:id", () => {
    it("should NOT get note (incorrect id)", (done) => {
      chai
        .request(server)
        .get(`/api/note/wrong_id`)
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response).to.be.an("object");
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("#GET /history/:id", () => {
    it("should get deleted note by id", (done) => {
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
  describe("#GET /history/:id", () => {
    it("should not get deleted note by id (incorrect id)", (done) => {
      chai
        .request(server)
        .get(`/api/history/wrong_id`)
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response).to.be.an("object");
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("#PUT /note/:id", () => {
    it("should update a note", (done) => {
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
  describe("#PUT /note/:id", () => {
    it("should NOT update a note (missing content)", (done) => {
      chai
        .request(server)
        .put(`/api/note/${id}`)
        .send({
          title: "Title set during testing",
        })
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("#PUT /note/:id", () => {
    it("should NOT update a note (missing body)", (done) => {
      chai
        .request(server)
        .put(`/api/note/${id}`)
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("#PUT /note/:id", () => {
    it("should NOT update a note (wrong id)", (done) => {
      chai
        .request(server)
        .put(`/api/note/wrong_id`)
        .send({
          title: "Title set during testing",
          content: "Content set during testing",
        })
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(404);
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("DELETE /note/:id", () => {
    it("should mark note as deleted", (done) => {
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
  describe("DELETE /note/:id", () => {
    it("should NOT mark note as deleted (wrong id)", (done) => {
      chai
        .request(server)
        .delete(`/api/note/wrong_id`)
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
  describe("#POST /note", () => {
    it("should create a new note", (done) => {
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
  describe("#POST /note", () => {
    it("should NOT create a new note (missing title)", (done) => {
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
  describe("#POST /note", () => {
    it("should NOT create a new note (missing body)", (done) => {
      chai
        .request(server)
        .post(`/api/note`)
        .end((err, response) => {
          if (err) done(err);
          expect(response).to.have.status(400);
          expect(response.body.success).to.be.eq(false);
          done();
        });
    });
  });
});
