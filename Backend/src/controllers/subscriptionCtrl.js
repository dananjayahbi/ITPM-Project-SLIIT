const mongoose = require("mongoose");
const User = require("../models/userModel");
const Sellar = require("../models/sellar.model");
const Company = require("../models/company.model");

//Subscribe A Company 
const subscribeToCompany = async (req, res) => {
    const { sellerId, companyId } = req.body;

    try {
        // Check if the seller exists
        const seller = await Sellar.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ msg: "Seller not found", success: false });
        }

        // Check if the seller is already subscribed to the new company
        if (seller.subscribeToCompany && seller.subscribeToCompany.toString() === companyId.toString()) {
            return res.status(400).json({ msg: "Seller is already subscribed to this company", success: false });
        }

        // If the seller is already subscribed to a company, unsubscribe them
        if (seller.subscribeToCompany) {
            const previousCompany = await Company.findById(seller.subscribeToCompany);
            if (previousCompany) {
                previousCompany.subscribedSellersCount -= 1;
                previousCompany.subscribedSellers.pull(sellerId);
                await previousCompany.save();
            }
        }

        // Subscribe the seller to the new company
        seller.subscribeToCompany = companyId;
        await seller.save();

        // Update the company's list of subscribed sellers and count
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ msg: "Company not found", success: false });
        }
        company.subscribedSellersCount += 1;
        company.subscribedSellers.push(sellerId);
        await company.save();

        res.json({ success: true, msg: "Seller subscribed to company successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", success: false });
    }
};



//Unsubscribe A Company by Sellar
const unsubscribeFromCompany = async (req, res) => {
    const { sellerId, companyId } = req.body;

    try {
        // Check if the seller is subscribed to the company
        const seller = await Sellar.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ msg: "Seller not found", success: false });
        }

        if (seller.subscribeToCompany.toString() !== companyId) {
            return res.status(400).json({ msg: "Seller is not subscribed to this company", success: false });
        }

        // Unsubscribe the seller from the company
        const company = await Company.findById(companyId);
        if (company) {
            company.subscribedSellersCount -= 1;
            company.subscribedSellers.pull(sellerId);
            await company.save();
        }

        seller.subscribeToCompany = null;
        await seller.save();

        res.json({ success: true, msg: "Seller unsubscribed from company successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", success: false });
    }
};

//Get Subscribed Unique Sellars for A Company
const fetchSubscribedSellersDetails = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        const company = await Company.findById(companyId).populate('subscribedSellers');
        if (!company) {
            return res.status(404).json({ success: false, msg: 'Company not found' });
        }
        
        const subscribedSellers = company.subscribedSellers.map(seller => ({
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            phone: seller.phone,
            address: seller.address
        }));

        res.json({ success: true, subscribedSellers });
    } catch (error) {
        console.error('Error fetching subscribed sellers:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};

//Ranking Companies Using The Sellar Subscription
const fetchCompanyRanking = async (req, res) => {
    try {       
        const companies = await Company.find({}, 'companyName subscribedSellersCount');

        const rankedCompanies = companies
            .sort((a, b) => b.subscribedSellersCount - a.subscribedSellersCount) 
            .reduce((acc, company, index, array) => {
                
                const rank = index > 0 && company.subscribedSellersCount === array[index - 1].subscribedSellersCount
                    ? acc[index - 1].rank 
                    : index + 1; 
                acc.push({ ...company.toObject(), rank });
                return acc;
            }, []);

        res.json({ success: true, rankedCompanies });
    } catch (error) {
        console.error('Error fetching company ranking:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};



module.exports = {subscribeToCompany,unsubscribeFromCompany,fetchSubscribedSellersDetails,fetchCompanyRanking}