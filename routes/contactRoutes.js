const express = require('express');
const router  = express.Router();
const {
    createContact,
    getContacts
} = require("../controllers/contactController");

// ── Contact routes (Member 3 — Database) ─────────────────────────────────────
// GET  /contact   → show contact form
// POST /contact   → save enquiry to DB

// TODO: Member 3 — implement contact form submission and admin enquiry view

// POST CONTACT FORM
router.post("/", createContact);


// GET ALL CONTACTS
router.get("/", getContacts);

router.get('/', (req, res) => res.render('contact', { title: 'Contact Us' }));

module.exports = router;
