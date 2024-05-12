const router = require('express').Router();

const { 
    createCheckoutSession
} = require('../controllers/paymentControler');

// Create a new checkout session
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;