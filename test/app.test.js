const mongoose = require("mongoose");
const request = require("supertest");
const { createUser, getUser } = require("../controllers/user.controller");
const app = require("../app");

beforeEach(async () => {
  for (var i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

// User testing model

describe("User", () => {
  it("redirects to login if not authenticated", async () => {
    const response = await request(app).get('/polls/create');
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/login");
  });

  it("Success Create", async () => {
    const credentials = { name: "Yuli Valencia", email: "yulivpnutri23@gmail.com", password: "123456789" };
    const response = await createUser(credentials);
    expect(response).toBe("User created succesfully!");
  });

  it("Success get account", async done => {
    try {
      const data = await getUser("5f4aa479136b1c24ca6bb6b6");
      expect(data).toEqual(expect.objectContaining({}));
      done();
    } catch (error) {
      done(error);
    }
  });
});