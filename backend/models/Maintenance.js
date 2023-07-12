const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    require: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
    require: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  staff: {
    type: String,
  },
  machineCode: {
    type: String,
    require: true,
  },
  machineLocation: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  supplies: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  repairStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  repairHistory: [
    {
      repairNote: String,
      replacedSupplies: String,
      totalCost: Number,
      repairTime: Date,
    },
  ],
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
