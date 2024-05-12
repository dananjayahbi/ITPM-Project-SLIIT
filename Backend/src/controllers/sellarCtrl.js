const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Sellar = require("../models/sellar.model");
const User = require("../models/userModel");

//Create A New Sellar
const createSeller = async (req, res) => {
  const { email, password, firstName, lastName, phone, address } = req.body;

  try {
    // Generate new ObjectId for both user and seller
    const userId = new mongoose.Types.ObjectId();
    const sellerId = userId;

    const findUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (!findUser) {
      // Secure Password With Hashing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with the generated ObjectId
      const newUser = await User.create({
        _id: userId,
        email,
        password: hashedPassword,
        role: "seller",
        firstName,
        lastName,
        phone,
        address,
      });

      // Create the seller using the same ObjectId as the user
      const sellerData = {
        _id: sellerId,
        user: userId,
        firstName,
        lastName,
        phone,
        address,
        creditsBalance : 0,
        activityHistory: [],
        boughtItems: [],
      };
      await Sellar.create(sellerData);

      res.json({ newUser, sellerId, sellerData,msg: "Sellar Successfully Registered!", success: true });
    } else {
      // User already exists
      res.json({ msg: "User Already Exists!", success: false });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.firstName) {
      // Handle duplicate key error for firstName
      console.error('Duplicate key error:', error);
      res.status(400).json({ success: false, message: 'Seller with the same first name already exists' });
    } else {
      // Handle other errors
      console.error('Error creating seller:', error);
      res.status(500).json({ success: false, message: 'An error occurred while creating the seller' });
    }
  }
};

//Get All Sellars

const getAllSellars = async (req, res) => {
  try {
    const sellers = await Sellar.find().populate("user", "email username");

    res.json({ success: true, sellers });
  } catch (error) {
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Get a Sellar
const GetaSellar = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Sellar.findById(id).populate("user", "email");

    if (!seller) {
      return res.status(404).json({ msg: "Seller not found", success: false });
    }

    res.json({ success: true, seller });
  } catch (error) {
    console.error("Error fetching seller:", error);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Update A Sellar
const updateSeller = async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await Sellar.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found", success: false });
    }

    const userUpdate = {};
    if (req.body.email) userUpdate.email = req.body.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userUpdate.password = hashedPassword;
    }
    if (Object.keys(userUpdate).length > 0) {
      // Update user with new email and/or password
      await User.findByIdAndUpdate(seller.user, userUpdate);
    }

    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      creditsBalance: req.body.creditsBalance,
      boughtItems: req.body.boughtItems,
      activityHistory: req.body.activityHistory,
    };

    // Update only provided fields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        seller[key] = updateFields[key];
      }
    });

    const updatedSeller = await seller.save();

    res.json({
      success: true,
      updatedSeller: { ...seller.toObject(), email: userUpdate.email },
    });
  } catch (error) {
    console.error("Error updating seller:", error);
    res
      .status(500)
      .json({
        msg: "Failed to update seller",
        error: error.message,
        success: false,
      });
  }
};

//Delete a Sellar
const deleteSeller = async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await Sellar.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found", success: false });
    }

    const user = await User.findById(seller.user);
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    await User.findByIdAndDelete(seller.user);

    await Sellar.findByIdAndDelete(sellerId);

    res.json({
      success: true,
      msg: "Seller and associated user deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting seller:", error);
    res
      .status(500)
      .json({
        msg: "Failed to delete seller",
        error: error.message,
        success: false,
      });
  }
};

module.exports = {
  createSeller,
  getAllSellars,
  GetaSellar,
  updateSeller,
  deleteSeller,
};
