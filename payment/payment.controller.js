const express = require('express');
const router = express.Router();
const stripetest = require('stripe')("sk_test_51Kn6MdIHmXLgaCfTABgaqWz0AluLfUqTFPda1zwnMtWI5btIuI6cl0QAIPZORjyGXExn7DiKZP4w2W0Y7R82jm5800aoV0eWij"); // replace STRIPE_SECRET_KEY with value



router.get('/', async (req, res) => {
    let customerId;

        //Gets the customer who's email id matches the one sent by the client
        const customerList = await stripetest.customers.list({
            email: req.query.email,
            limit: 1
        });
                
        //Checks the if the customer exists, if not creates a new customer
        if (customerList.data.length !== 0) {
            customerId = customerList.data[0].id;
        }
        else {
            const customer = await stripetest.customers.create({
                email: req.query.email
            });
            customerId = customer.data.id;
        }

        //Creates a temporary secret key linked with the customer 
        const ephemeralKey = await stripetest.ephemeralKeys.create(
            { customer: customerId },
            { apiVersion: '2020-08-27' }
        );

    const paymentIntent = await stripetest.paymentIntents.create({
        amount: parseInt(req.query.amount) * 100 ,
        currency: req.query.currency,
        customer: customerId,
    }, function (error, paymentIntent) {
        if (error != null) {
            console.log(error);
            res.json({ "error": error });
        } else {
            res.json({
                paymentIntent: paymentIntent.client_secret,
                paymentIntentData: paymentIntent,
                ephemeralKey: ephemeralKey.secret,
                amount: req.body.amount,
                currency: req.body.currency,
                customer: customerId,
                success: true
            });
        }
    });
});


module.exports = router;