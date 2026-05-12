const express = require('express');
const router  = express.Router();
const Event   = require('../models/Event');

// GET / — Home page with event listing, search & filter
router.get('/', async (req, res) => {
  try {
    const { search, category, date } = req.query;

    // Build query object dynamically based on filters
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive
    }
    if (category) {
      query.category = category;
    }
    if (date) {
      const start = new Date(date);
      const end   = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date  = { $gte: start, $lte: end };
    }

    const events = await Event.find(query).sort({ date: 1 }); // soonest first

    res.render('index', {
      title: 'Home',
      events,
      search:   search   || '',
      category: category || '',
      date:     date     || '',
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
});

module.exports = router;
