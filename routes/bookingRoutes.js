const express = require('express');
const router  = express.Router();

// ── Booking routes (Member 2 — Backend)
// POST /bookings            → create booking with capacity check
// GET  /bookings/my-bookings → user booking history
// GET  /bookings/dashboard  → admin analytics dashboard
// DELETE /bookings/:id      → cancel booking

router.get('/my-bookings', (req, res) => res.send('My bookings — Member 2 to implement'));
router.get('/dashboard',   (req, res) => res.send('Admin dashboard — Member 2 to implement'));

module.exports = router;
