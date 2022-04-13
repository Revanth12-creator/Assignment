const express = require("express");
const router = express.Router();

//import userController
const USER_CONTROLLER = require("../controllers/user_controller");

//userRoutes
router.post("/create", USER_CONTROLLER.CREATE_USER);
router.get("/", USER_CONTROLLER.GET_ALL__USER);
router.get("/findone/:id", USER_CONTROLLER.FIND_ONE_USER);
router.patch("/update/:id", USER_CONTROLLER.UPDATE_USER);
router.delete("/delete/:id", USER_CONTROLLER.DELETE_USER);

module.exports = router;
