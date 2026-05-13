const express = require('express');
const router  = express.Router();

// ── Contact routes (Member 3 — Database) ─────────────────────────────────────
// GET  /contact   → show contact form
// POST /contact   → save enquiry to DB

// TODO: Member 3 — implement contact form submission and admin enquiry view

router.get('/', (req, res) => res.render('contact', { title: 'Contact Us' }));

module.exports = router;
