const express         = require('express');
const router          = express.Router();
const eventController = require('../controllers/eventController');
const isAuthenticated = require('../middleware/authMiddleware');
const isAdmin         = require('../middleware/roleMiddleware');

// GET  /events              → list all events (public)
router.get('/', eventController.getAllEvents);

// GET  /events/manage       → admin management table (admin only)
//   NOTE: /manage must be defined BEFORE /:id to avoid being caught as an id param
router.get('/manage', isAuthenticated, isAdmin, eventController.getManageEvents);

// GET  /events/new          → show create form (admin only)
router.get('/new', isAuthenticated, isAdmin, eventController.getNewEventForm);

// POST /events              → create a new event (admin only)
router.post('/', isAuthenticated, isAdmin, eventController.createEvent);

// GET  /events/:id          → single event detail page (public)
router.get('/:id', eventController.getEventById);

// GET  /events/:id/edit     → edit form (admin only)
router.get('/:id/edit', isAuthenticated, isAdmin, eventController.getEditEventForm);

// PUT  /events/:id          → update event (admin only)
router.put('/:id', isAuthenticated, isAdmin, eventController.updateEvent);

// DELETE /events/:id        → delete event (admin only)
router.delete('/:id', isAuthenticated, isAdmin, eventController.deleteEvent);

module.exports = router;
