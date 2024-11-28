const express = require('express')
const app = express()
app.use(express.json())
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
    {name: "Darth Vader", email: "darth.vader@darkside.com", password: "bbbb"}
  ];

  it("should return a list of users", async () => {
    User.find.mockResolvedValue(mockUser);
    await getAllUsers(req, res);
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
  
});