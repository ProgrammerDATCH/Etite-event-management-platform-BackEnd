import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("User Test Cases", () => {
    let token="";

    it("Should be able register new user", (done) => {
      router()
        .post("/api/user/register")
        .send({
          name: "TestingUser",
          email: "testuser@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object").that.has.property("status", true);
          done(error);
        });
    });
  
    it("Should not add same user twice", (done) => {
      router()
        .post("/api/user/register")
        .send({
          name: "TestingUser",
          email: "testuser@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "User already exist.");
          done(error);
        });
    });

    it("Should not be able to login registered user with wrong password", (done) => {
      router()
        .post("/api/user/login")
        .send({
          email: "testuser@gmail.com",
          password: "PasswordForUserModified",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          done(error);
        });
    });

    it("Should be able to login registered user", (done) => {
      router()
        .post("/api/user/login")
        .send({
          email: "testuser@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").that.is.an("object");
          expect(response.body.message).to.have.property("token");
          token=response.body.message.token;
          done(error);
        });
    });

    it("Should be able to check logged in user by Token", (done) => {
      router()
        .post("/api/user/check")
        .set("Authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").to.be.an("object");
          done(error);
        });
    });

    it("Should be able to detect invalid Token", (done) => {
      router()
        .post("/api/user/check")
        .set("Authorization", `Bearer faketoken`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "You are not logged in. Invalid Token.");
          done(error);
        });
    });

    it("Should be able to update registered user", (done) => {
      router()
        .patch("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "TestingUser-Updated",
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message");
          done(error);
        });
    });

    it("Should not be able to update registered user with empty name", (done) => {
      router()
        .patch("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "Failed to update User");
          done(error);
        });
    });

    it("Should be able to delete registered user", (done) => {
      router()
        .delete("/api/user/delete")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message", "Deleted");
          done(error);
        });
    });

    
    it("Should not be able to check user with invalid user ID", (done) => {
      router()
        .post("/api/user/check")
        .set("Authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          done(error);
        });
    });

    
    it("Should not be able to update registered user with invalid email", (done) => {
      router()
        .patch("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "TestingUser-Updated-2",
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          done(error);
        });
    });
  
    it("User should not be able to login with invalid credentials", (done) => {
      router()
        .post("/api/user/login")
        .send({
          email: "fake@gmail.com",
          password: "fakePassword"
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "Invalid credentials");
          done(error);
        });
    });
  
  });