import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { testImg } from "../../../constants";
import { ticketStatus } from "../../../types";

chai.use(chaiHttp);
const router = () => chai.request(app);


function loginAdminAndCreateEvent(callback: Function) {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  router()
    .post("/api/admin/login")
    .send({
      email: adminEmail,
      password: adminPassword,
    })
    .end((error, response) => {
      if (error) { return callback(error); }
      const adminToken = response.body.message.token;
      router()
        .post("/api/event/add")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "EventTest2",
          date: "28-04-2024",
          location: "KCC - Kigali Convention Center",
          image: testImg,
          maxTickets: 100
        })
        .end((error, response) => {
          if (error) { return callback(error); }
          const createdEvent = response.body.message;
          callback(null, adminToken, createdEvent);
        });
    });
}

function registerAndLoginUser(callback: Function) {
  router()
    .post("/api/user/register")
    .send({
      name: "Test User",
      email: "programmerdatch@gmail.com",
      password: "PasswordForUser",
    })
    .end((error, response) => {
      if (error) {
        return callback(error);
      }

      router()
        .post("/api/user/login")
        .send({
          email: "programmerdatch@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          if (error) {
            return callback(error);
          }
          const token = response.body.message.token;
          callback(null, token);
        });
    });
}

describe("Tickets Test Cases", () => {

  let token = "";
  let adminToken = "";
  let createdTicket = {};
  let createdEvent = {};
  const fakeId = "609d2071278a0914dca23b99";

  before(function (done) {
    registerAndLoginUser((error: any, retrievedToken: string) => {
      if (error) {
        return done(error);
      }
      token = retrievedToken;

      loginAdminAndCreateEvent((error: any, loggedInAdminToken: string, testCreatedEvent: any) => {
        if (error) {
          return done(error);
        }
        adminToken = loggedInAdminToken;
        createdEvent = testCreatedEvent;
        done();
      });
    });
  });


  after(function (done) {
    router()
      .delete("/api/user/delete")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        router()
          .delete("/api/event/delete")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            id: (createdEvent as any)._id,
          })
          .end((error, response) => {
            if (error) {
              return done(error);
            }
            done();
          });
      });
  });


  it("Should not be able to add Ticket without login token", (done) => {
    router()
      .post("/api/ticket/add")
      .send({
        eventId: (createdEvent as any)._id,
        amount: 5
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object").that.has.property("status", false);
        done(error);
      });
  });

  it("Should not be able to get Tickets without Admin login Token", (done) => {
    router()
      .get(`/api/ticket/tickets/${(createdEvent as any)._id}`)
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status", false);
        done(error);
      });
  });

  it("Should be able to add new Ticket", (done) => {
    router()
      .post("/api/ticket/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventId: (createdEvent as any)._id,
        amount: 5
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message").that.is.an("object");
        createdTicket = response.body.message;
        done(error);
      });
  });

  it("Should be able to update Ticket amount (by USER)", (done) => {
    router()
      .patch("/api/ticket/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTicket as any)._id,
        amount: 8
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should be able to update Ticket status (by ADMIN)", (done) => {
    router()
      .patch("/api/ticket/updateStatus")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: (createdTicket as any)._id,
        status: ticketStatus.APPROVED
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should not be able to update Ticket with invalid ID", (done) => {
    router()
      .patch("/api/ticket/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: fakeId,
        amount: 9
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", false);
        done(error);
      });
  });

  it("Should be able to get All Tickets of Events", (done) => {
    router()
      .get(`/api/ticket/tickets/${(createdEvent as any)._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message").that.is.an("array");
        done(error);
      });
  });

  it("Should be able to delete Ticket", (done) => {
    router()
      .delete("/api/ticket/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTicket as any)._id,
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should not be able to delete Ticket with invalid ID", (done) => {
    router()
      .delete("/api/ticket/delete")
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


