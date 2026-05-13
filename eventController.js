const Event = require('../models/Event');

// GET /events — list all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('events/index', { title: 'All Events', events });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
};

// GET /events/new — show create form (admin only)
exports.getNewEventForm = (req, res) => {
  res.render('events/new', { title: 'Create Event' });
};

// POST /events — create a new event (admin only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity, price } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      capacity: Number(capacity),
      price: Number(price) || 0,
      createdBy: req.session.user._id,
    });

    await event.save();
    req.flash('success', `Event "${event.title}" created successfully.`);
    res.redirect('/events/manage');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to create event. Please check all fields.');
    res.redirect('/events/new');
  }
};

// GET /events/manage — admin event management table
exports.getManageEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('events/manage', { title: 'Manage Events', events });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
};

// GET /events/:id — single event detail page (public)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).render('404', { title: 'Event Not Found' });
    }
    res.render('events/detail', { title: event.title, event });
  } catch (err) {
    console.error(err);
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(404).render('404', { title: 'Event Not Found' });
    }
    res.status(500).render('500', { title: 'Server Error' });
  }
};

// GET /events/:id/edit — show edit form (admin only)
exports.getEditEventForm = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).render('404', { title: 'Event Not Found' });
    }
    res.render('events/edit', { title: `Edit: ${event.title}`, event });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
};

// PUT /events/:id — update event (admin only)
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity, price } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).render('404', { title: 'Event Not Found' });
    }

    // Recalculate ticketsLeft if capacity changed
    const oldCapacity = event.capacity;
    const newCapacity = Number(capacity);
    const ticketsDiff = newCapacity - oldCapacity;

    event.title       = title;
    event.description = description;
    event.date        = date;
    event.location    = location;
    event.category    = category;
    event.capacity    = newCapacity;
    event.price       = Number(price) || 0;

    // Adjust ticketsLeft proportionally, but never go below 0
    event.ticketsLeft = Math.max(0, event.ticketsLeft + ticketsDiff);

    await event.save();
    req.flash('success', `Event "${event.title}" updated successfully.`);
    res.redirect('/events/manage');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update event.');
    res.redirect(`/events/${req.params.id}/edit`);
  }
};

// DELETE /events/:id — delete event (admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).render('404', { title: 'Event Not Found' });
    }
    req.flash('success', `Event "${event.title}" deleted.`);
    res.redirect('/events/manage');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to delete event.');
    res.redirect('/events/manage');
  }
};
