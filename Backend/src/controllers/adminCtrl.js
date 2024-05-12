const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
const User = require("../models/userModel");

//Create A New Admin
const createAdmin = async (req, res) => {
  const { email, password, firstName, lastName, phone} = req.body;

  try {
    // Generate new ObjectId for both user and seller
    const userId = new mongoose.Types.ObjectId();
    const adminId = userId;

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
        role: "admin",
        firstName,
        lastName,
        phone,
      });

      // Create the admin using the same ObjectId as the user
      const adminData = {
        _id: adminId,
        user: userId,
        firstName,
        lastName,
        phone,
      };
      await Admin.create(adminData);

      res.json({ newUser, adminId, adminData,msg: "Admin Successfully Registered!", success: true });
    } else {
      // User already exists
      res.json({ msg: "User Already Exists!", success: false });
    }
  } catch (error) {
    console.error("Error creating company:", error);
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Get All Sellars

const getAllAdmin = async (req, res) => {
    try {
      const admins = await Admin.find().populate("user", "email username");
  
      res.json({ success: true, admins });
    } catch (error) {
      // Internal server error
      res.status(500).json({ msg: "Internal Server Error", success: false });
    }
  };
module.exports = {createAdmin,getAllAdmin}