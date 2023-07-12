const router = require("express").Router();

const maintenanceSuppliesController = require("../controllers/MaintenanceSupplies.controller");

router.post("/", maintenanceSuppliesController.createSupplies);
router.get("/", maintenanceSuppliesController.getAllSupplies);

module.exports = router;
