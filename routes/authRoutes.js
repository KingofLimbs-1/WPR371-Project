const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.showLogin);
router.post("/login", authController.loginUser);

router.get("/register", authController.showRegister);
router.post("/register", authController.registerUser);

router.post("/logout", authController.logoutUser);

module.exports = router;