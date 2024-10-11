const express = require('express')
const emailCtrl = require('../controllers/email.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


// Routes d'envoi des emails
router.post('/userNotification/:id', auth.verifyToken, emailCtrl.userNotificationEmail)

module.exports = router