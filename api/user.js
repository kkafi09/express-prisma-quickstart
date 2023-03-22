const express = require("express");
const router = express.Router();
const jwtAuth = require("../middlewares/jwtAuth")

const userController = require("../controllers/userController");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/", jwtAuth.verifyToken, userController.getUser);

module.exports = router;
