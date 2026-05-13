const express = require("express");
const router = express.Router();

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

const {
    isAdmin
} = require("../middleware/roleMiddleware");


// Logged in users only
router.get("/my-bookings", isAuthenticated, (req, res) =>
    res.send("My bookings — logged in user")
);


// Admin only
router.get("/dashboard", isAuthenticated, isAdmin, (req, res) =>
    res.send("Admin dashboard")
);

module.exports = router;