const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuModels");
const { upload } = require("../middleware/cloudinary");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, taxPercent,category } = req.body;

    const imageUrl = req.file ? req.file.path : "";

    const newItem = new MenuItem({
      name,
      price,
      taxPercent,
      category,
      image: imageUrl,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find().sort({ createdAt: -1 });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      ...req.body,
      ...(req.file && { image: req.file.path }),
    };

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
