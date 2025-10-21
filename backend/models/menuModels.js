const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "" },
    // availability: { type: Boolean, default: true },
    tax_percent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("menuModels", MenuItemSchema);
