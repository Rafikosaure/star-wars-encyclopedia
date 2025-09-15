const ENV = require('./config.js')

// Import de Stripe pour la partie Shopping
const Stripe = require('stripe');
const stripe = Stripe(ENV.STRIPE_TEST_SECRET_KEY);

module.exports = stripe;