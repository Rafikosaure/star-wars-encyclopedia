const express = require('express')
const webhookCtrl = require('../controllers/webhook.controller.js')
const router = express.Router()

// Routes des webhooks du projet
router.post('/', webhookCtrl.backendDeployWebhook)

module.exports = router