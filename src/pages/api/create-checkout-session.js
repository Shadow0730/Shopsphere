const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { items, email } = req.body;

    if (!Array.isArray(items) || items.length === 0 || !email) {
        return res.status(400).json({ error: 'A signed-in user and basket items are required' });
    }

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'inr',
            unit_amount: Math.round(item.price * 100),
            product_data: {
                name: item.title,
                images: [item.image]
            }
        }
    }))

    const checkoutData = {
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata:{
            email,
            images: JSON.stringify(items.map(item => item.image))
        },
    };

    if (process.env.STRIPE_SHIPPING_RATE_ID) {
        checkoutData.shipping_options = [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID }];
    }

    try {
        const session = await stripe.checkout.sessions.create(checkoutData);
        return res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Stripe checkout error:', error.message);
        return res.status(500).json({ error: 'Unable to create Stripe checkout session' });
    }
};
