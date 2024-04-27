import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { testImg } from "../../../constants";

chai.use(chaiHttp);
const router = () => chai.request(app);

function loginAdmin(callback: Function) {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  router()
    .post("/api/admin/login")
    .send({
      email: adminEmail,
      password: adminPassword,
    })
    .end((error, response) => {
      if (error) {
        return callback(error);
      }

      const token = response.body.message.token;
      callback(null, token);
    });
}

describe("Events Test Cases", () => {

  let token = "";
  let createdEvent = {};
  const fakeId = "609d2071278a0914dca23b99";

  before(function (done) {
    loginAdmin((error: any, retrievedToken: string) => {
      if (error) {
        return done(error);
      }
      token = retrievedToken;
      done();
    });
  });

  it("Should not be able to add Event without Admin login token", (done) => {
    router()
      .post("/api/event/add")
      .send({
        title: "EventTest1",
        date: "28-04-2024",
        location: "KCC - Kigali Convention Center",
        image: testImg,
        maxTickets: 200
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object").that.has.property("status", false);
        done(error);
      });
  });

  it("Should be able to get all events", (done) => {
    router()
      .get("/api/event/events")
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message").that.is.an("array");
        done(error);
      });
  });

  it("Should be able to add new Event", (done) => {
    router()
      .post("/api/event/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "EventTest1",
        date: "28-04-2024",
        location: "KCC - Kigali Convention Center",
        image: testImg,
        maxTickets: 200
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message").that.is.an("object");
        createdEvent = response.body.message;
        done(error);
      });
  });

  it("Should be able to update Event", (done) => {
    router()
      .patch("/api/event/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdEvent as any)._id,
        title: "EventTest1Updated",
        date: "29-04-2024",
        location: "KCC - Kigali Convention Center",
        image: testImg,
        maxTickets: 250
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should not be able to update Event with invalid ID", (done) => {
    router()
      .patch("/api/event/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: fakeId,
        title: "EventTest1UpdateWillFail",
        date: "25-04-2024",
        location: "KCC - Kigali Convention Center",
        image: testImg,
        maxTickets: 100
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", false);
        done(error);
      });
  });

  it("Should be able to delete Event", (done) => {
    router()
      .delete("/api/event/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdEvent as any)._id,
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should not be able to delete Event with invalid ID", (done) => {
    router()
      .delete("/api/event/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: fakeId,
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", false);
        done(error);
      });
  });

});


