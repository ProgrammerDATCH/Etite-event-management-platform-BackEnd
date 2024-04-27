import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Admin Test Cases", () => {
    let adminEmail = process.env.ADMIN_EMAIL;
    let adminPassword = process.env.ADMIN_PASSWORD;
    let token="";
    
    it("Should not be able to login admin with wrong credentials", (done) => {
      router()
        .post("/api/admin/login")
        .send({
          email: "fake@gmail.com",
          password: "fakePassword",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "Invalid credentials");
          done(error);
        });
    });

    it("Should be able to login admin", (done) => {
      router()
        .post("/api/admin/login")
        .send({
          email: adminEmail,
          password: adminPassword,
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").that.is.an("object").that.has.property("token");
          token=response.body.message.token;
          done(error);
        });
    });

    it("Should be able to check logged in Admin by Token", (done) => {
      router()
        .post("/api/admin/check")
        .set("Authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").that.is.an("object");
          done(error);
        });
    });

    it("Should be able to view all admin statistics", (done) => {
      router()
        .get("/api/admin/dashboard")
        .set("Authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").that.is.an("object");
          done(error);
        });
    });

    it("Should be able to view all Users", (done) => {
      router()
        .get("/api/user/users")
        .set("Authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", true);
          expect(response.body).to.have.property("message").that.is.an("array");
          done(error);
        });
    });

    it("Should be able to detect invalid Token", (done) => {
      router()
        .post("/api/admin/check")
        .set("Authorization", `Bearer faketoken`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status", false);
          expect(response.body).to.have.property("message", "You are not logged in as Admin.");
          done(error);
        });
    });

  });