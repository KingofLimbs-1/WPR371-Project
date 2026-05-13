const express = require('express');
const router  = express.Router();
const {
    getEvents
} = require("../controllers/eventController");

// Event routes (Member 2 — Backend)
// GET  /events              → list all events
// GET  /events/new          → show create form (admin)
// POST /events              → create event (admin)
// GET  /events/manage       → admin management view
// GET  /events/:id          → single event detail
// GET  /events/:id/edit     → edit form (admin)
// PUT  /events/:id          → update event (admin)
// DELETE /events/:id        → delete event (admin)

// TODO: Member 2 — implement all event routes with auth + role middleware

router.get('/', (req, res) => res.send('Events route — Member 2 to implement'));
router.get('/manage', (req, res) => res.send('Event management — Member 2 to implement'));
router.get('/:id', (req, res) => res.send('Event detail — Member 2 to implement'));
router.get("/", getEvents);

module.exports = router;
