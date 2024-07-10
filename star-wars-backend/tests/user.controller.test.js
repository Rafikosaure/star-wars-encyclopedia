const express = require('express')
// const request = require('supertest')
// const userRoutes = require('../routes/user.routes.js')
const app = express()
app.use(express.json())
// app.use("/user", userRoutes)
// const second = 1000;
const { getAllUsers } = require('../controllers/user.controller.js')
const User = require('../models/user.model.js');





jest.mock('../models/user.model.js');
describe('getAllUsers', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  const mockUser = [
    {name: "Dinn Djarin", email: "dinn.djarin@mandalore.com", password: "aaaa"}, 
    {name: "Dark Vader", email: "dark.vador@darkside.com", password: "aaaa"}
  ];

  it("should return a list of users", async () => {
    User.find.mockResolvedValue(mockUser);
    await getAllUsers(req, res);
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
  
});

// describe("to test the user routes of the backend application", () => {
//   it("verify the register of a new user", async () => {
//   const { body, statusCode } = await request(app).post(`/user/register`)
//   .send(formData);
//   expect(statusCode).toBe(201);
//   expect(body).toBe({
//     message: 'Utilisateur créé !'
//   });
//   }, 60 * second);
// })
