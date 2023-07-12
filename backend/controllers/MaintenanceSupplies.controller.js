const MaintenanceSupplies = require("../models/MaintenanceSupplies");

const maintenanceSuppliesController = {
  createSupplies: async (req, res) => {
    try {
      const { name, seri } = req.body;

      // Tạo một đối tượng mới từ dữ liệu được gửi từ client
      const newSupplies = new MaintenanceSupplies({
        name,
        seri,
      });

      // Lưu đối tượng mới vào cơ sở dữ liệu
      const savedSupplies = await newSupplies.save();

      res.status(201).json(savedSupplies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllSupplies: async (req, res) => {
    try {
      // Lấy tất cả các bản ghi từ cơ sở dữ liệu
      const supplies = await MaintenanceSupplies.find();

      res.status(200).json(supplies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = maintenanceSuppliesController;
