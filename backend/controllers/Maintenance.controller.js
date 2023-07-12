const Maintenance = require("../models/Maintenance");

const maintenanceController = {
  createMaintenance: async (req, res) => {
    try {
      const {
        nameProduct,
        customerId,
        fullname,
        phone,
        address,
        machineCode,
        machineLocation,
        note,
      } = req.body;

      const maintenance = new Maintenance({
        nameProduct,
        customerId,
        fullname,
        phone,
        address,
        machineCode,
        machineLocation,
        note,
      });

      const savedMaintenance = await maintenance.save();

      res.json(savedMaintenance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMaintenanceBycustomerId: async (req, res) => {
    try {
      const { customerId } = req.params;

      const maintenance = await Maintenance.find({ customerId });

      if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }

      res.json(maintenance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllMaintenance: async (req, res) => {
    try {
      const maintenanceList = await Maintenance.find();

      res.json(maintenanceList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateStaffAndSupplies: async (req, res) => {
    try {
      const { maintenanceId } = req.params;
      const { staffId, staff, supplies } = req.body;

      const maintenance = await Maintenance.findById(maintenanceId);

      if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }

      maintenance.staff = staff;
      maintenance.staffId = staffId;
      maintenance.supplies = supplies;

      const updatedMaintenance = await maintenance.save();

      res.json(updatedMaintenance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getMaintenanceByStaffId: async (req, res) => {
    try {
      const { staffId } = req.params;

      const maintenance = await Maintenance.find({ staffId });

      if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }

      res.json(maintenance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  repairfinished: async (req, res) => {
    try {
      const { maintenanceId } = req.params;
      const { repairStatus, repairNote, replacedSupplies, totalCost } =
        req.body;

      const maintenance = await Maintenance.findById(maintenanceId);

      if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }

      // Cập nhật trạng thái sửa chữa
      maintenance.repairStatus = repairStatus;

      // Tạo lịch sử ghi chú
      const repairHistoryItem = {
        repairNote,
        replacedSupplies,
        totalCost,
        repairTime: new Date(),
      };

      maintenance.repairHistory.push(repairHistoryItem);

      const updatedMaintenance = await maintenance.save();

      res.json(updatedMaintenance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = maintenanceController;
