const mongoose = require("mongoose");

const maintenanceSuppliesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  seri: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "MaintenanceSupplies",
  maintenanceSuppliesSchema
);
