const router = require("express").Router();

const maintenanceController = require("../controllers/Maintenance.controller");

router.post("/", maintenanceController.createMaintenance);
router.get("/", maintenanceController.getAllMaintenance);
router.get("/:customerId", maintenanceController.getMaintenanceBycustomerId);
router.get("/staff/:staffId", maintenanceController.getMaintenanceByStaffId);
router.put("/:maintenanceId", maintenanceController.updateStaffAndSupplies);
router.put(
  "/staff/repairfinished/:maintenanceId",
  maintenanceController.repairfinished
);

module.exports = router;
