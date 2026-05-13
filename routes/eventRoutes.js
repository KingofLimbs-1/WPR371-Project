const express = require("express");
const router = express.Router();

const {
    getEvents
} = require("../controllers/eventController");

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

const {
    isAdmin
} = require("../middleware/roleMiddleware");


// Public routes
router.get("/", getEvents);

router.get("/:id", (req, res) =>
    res.send("Event detail — Member 2 to implement")
);


// Admin only
router.get("/manage", isAuthenticated, isAdmin, (req, res) =>
    res.send("Event management — Admin only")
);

module.exports = router;