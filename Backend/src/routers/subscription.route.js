const express = require("express");
const {subscribeToCompany,unsubscribeFromCompany,fetchSubscribedSellersDetails,fetchCompanyRanking} = require("../controllers/subscriptionCtrl");
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

//Subscription Routes
router.post("/subscribe",subscribeToCompany);
router.post('/unsubscribe',authMiddleware,unsubscribeFromCompany);
router.get('/:companyId/subscribedSellers', fetchSubscribedSellersDetails);
router.get('/ranking', fetchCompanyRanking);


module.exports =router;
