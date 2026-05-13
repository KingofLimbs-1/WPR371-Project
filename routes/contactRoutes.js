const express = require("express");
const router = express.Router();

const {
    createContact,
    getContacts
} = require("../controllers/contactController");

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

const {
    isAdmin
} = require("../middleware/roleMiddleware");


// PUBLIC CONTACT FORM
router.get("/", (req, res) => {
    res.render("contact", {
        title: "Contact Us"
    });
});


// ANY USER CAN SUBMIT
router.post("/", createContact);


// ONLY ADMIN CAN VIEW ALL ENQUIRIES
router.get(
    "/admin",
    isAuthenticated,
    isAdmin,
    getContacts
);

module.exports = router;