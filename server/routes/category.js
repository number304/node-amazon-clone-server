const router = require("express").Router();
const Category = require("../models/category");

// POST request - create a category
router.post("/category", async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();
    res.json({
      success: true,
      message: "New category succesfully created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET request - get all categories
router.get("/category", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
