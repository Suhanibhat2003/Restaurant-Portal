const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuModels");

// Get all menu items
router.get("/", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// Add menu item
router.post("/", async (req, res) => {
  const newItem = new MenuItem(req.body);
  const savedItem = await newItem.save();
  res.json(savedItem);
});

// Delete menu item
router.delete("/:id", async (req, res) => {
  const deleted = await MenuItem.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
