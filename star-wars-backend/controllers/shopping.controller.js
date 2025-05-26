const stripe = require('../config/stripe.js');
const ENV = require('../config/config.js');


// Créer une session checkout avec Stripe
exports.createCheckoutSession = async (req, res) => {
    const { basketItems } = req.body;

    try {
        const line_items = basketItems.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.price * 100, // Stripe attend les montants en centimes
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: `${ENV.CORS_ORIGIN}/success`,
            cancel_url: `${ENV.CORS_ORIGIN}/shopping/market`,
        });

        res.status(200).json({ url: session.url });

    } catch(error) {
        console.error('Stripe Checkout error:', error);
        res.status(500).json({ error: 'Erreur lors de la création de la session' });
    }
}