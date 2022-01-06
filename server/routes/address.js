const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewares/verify-token");

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
    let address = Address.find({ user: req.decoded._id });

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

module.exports = router;
