const express = require('express')
const request = require('supertest')
const userRoutes = require('../routes/user.routes.js')
const app = express()
app.use(express.json())
app.use("/user", userRoutes)
const second = 1000;
const formData = new FormData()
formData.append('name', 'Obi-Wan Kenobi')
formData.append('email', 'obiwan.kenobi@coruscant.com')
formData.append('password', 'aaaa')

describe("to test the user routes of the backend application", () => {
  it("verify the register of a new user", async () => {
  const { body, statusCode } = await request(app).post(`/user/register`)
  .send(formData);
  expect(statusCode).toBe(201);
  expect(body).toBe({
    message: 'Utilisateur créé !'
  });
  }, 60 * second);
})
