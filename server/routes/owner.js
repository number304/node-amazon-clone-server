const router = require("express").Router();
const Owner = require("../models/owner");

const upload = require("../middlewares/upload-photo");

// POST request - create a new owner
router.post("/owner", upload.single("photo"), async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();

    res.json({
      success: true,
      message: "New owner successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET request - get all owners
router.get("/owner", async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
