const express           = require('express');
const router            = express.Router();
const bookingController = require('../controllers/bookingController');
const isAuthenticated   = require('../middleware/authMiddleware');
const isAdmin           = require('../middleware/roleMiddleware');

// GET  /bookings/my-bookings  → user's booking history (logged in)
router.get('/my-bookings', isAuthenticated, bookingController.getMyBookings);

// GET  /bookings/dashboard    → admin analytics dashboard (admin only)
router.get('/dashboard', isAuthenticated, isAdmin, bookingController.getAdminDashboard);

// POST /bookings              → create a new booking (logged in)
router.post('/', isAuthenticated, bookingController.createBooking);

// DELETE /bookings/:id        → cancel a booking (logged in, owner only)
router.delete('/:id', isAuthenticated, bookingController.cancelBooking);

module.exports = router;
