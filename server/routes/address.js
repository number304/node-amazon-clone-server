const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

// POST a new user's address
router.post("/address", verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullname = req.body.fullname;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipcode = req.body.zipcode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    res.json({
      success: true,
      message: "Address successfully saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET all user addresses
router.get("/address", verifyToken, async (req, res) => {
  try {
    let address = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET one user address
router.get("/address/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({
      user: req.decoded._id,
      _id: req.params.id,
    });

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET to consume external API to get countries
router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.com/v2/all");

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT to update address
router.put("/address/:id", verifyToken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({
      user: req.decoded._id,
      _id: req.params.id,
    });

    if (foundAddress) {
      foundAddress.country = req.body.country || foundAddress.country;
      foundAddress.fullname = req.body.fullname || foundAddress.fullname;
      foundAddress.streetaddress =
        req.body.streetaddress || foundAddress.streetaddress;
      foundAddress.city = req.body.city || foundAddress.city;
      foundAddress.state = req.body.state || foundAddress.state;
      foundAddress.zipcode = req.body.zipcode || foundAddress.zipcode;
      foundAddress.phoneNumber =
        req.body.phoneNumber || foundAddress.phoneNumber;
      foundAddress.deliverInstructions =
        req.body.deliverInstructions || foundAddress.deliverInstructions;
      foundAddress.securityCode =
        req.body.securityCode || foundAddress.securityCode;

      await foundAddress.save();

      res.json({
        success: true,
        message: "Address succesfully updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE address
router.delete("/address/:id", verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.deleteOne({
      user: req.decoded._id,
      _id: req.params.id,
    });

    if (deletedAddress) {
      res.json({
        success: true,
        message: "Address deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT to change default address
router.put("/address/set/default", verifyToken, async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );

    if (doc) {
      res.json({
        success: true,
        message: "Successfully set this address as default",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
