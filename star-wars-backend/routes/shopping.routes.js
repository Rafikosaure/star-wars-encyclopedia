const express = require('express')
const router = express.Router()
const shoppingCtrl = require('../controllers/shopping.controller')


// Route de paiement via Stripe (e-commerce)
router.post('/create-checkout-session', shoppingCtrl.createCheckoutSession)

module.exports = router