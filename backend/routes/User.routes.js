const router = require("express").Router();

const userController = require("../controllers/User.controller");

router.get("/", userController.getAllUser);

module.exports = router;
