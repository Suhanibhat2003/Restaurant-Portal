const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "" },
    taxPercent: { type: Number, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("menuModels", MenuItemSchema);
