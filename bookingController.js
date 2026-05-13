const Booking = require('../models/Booking');
const Event   = require('../models/Event');

// POST /bookings — create a booking with capacity validation
exports.createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const qty = Number(quantity) || 1;

    if (qty < 1) {
      req.flash('error', 'Quantity must be at least 1.');
      return res.redirect(`/events/${eventId}`);
    }

    // Use findById first so we can check ticketsLeft
    const event = await Event.findById(eventId);
    if (!event) {
      req.flash('error', 'Event not found.');
      return res.redirect('/');
    }

    // Capacity check
    if (event.ticketsLeft <= 0) {
      req.flash('error', 'Sorry, this event is sold out.');
      return res.redirect(`/events/${eventId}`);
    }
    if (qty > event.ticketsLeft) {
      req.flash('error', `Only ${event.ticketsLeft} ticket(s) remaining.`);
      return res.redirect(`/events/${eventId}`);
    }

    // Check if this user already has a booking for this event
    const existing = await Booking.findOne({
      userId:  req.session.user._id,
      eventId: eventId,
    });
    if (existing) {
      req.flash('error', 'You already have a booking for this event.');
      return res.redirect(`/events/${eventId}`);
    }

    // Save the booking
    const booking = new Booking({
      userId:   req.session.user._id,
      eventId:  eventId,
      quantity: qty,
    });
    await booking.save();

    // Decrement ticketsLeft atomically
    await Event.findByIdAndUpdate(eventId, { $inc: { ticketsLeft: -qty } });

    req.flash('success', `Booked ${qty} ticket(s) for "${event.title}". Enjoy the event!`);
    res.redirect('/bookings/my-bookings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Booking failed. Please try again.');
    res.redirect('/');
  }
};

// GET /bookings/my-bookings — logged-in user's booking history
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.user._id })
      .populate('eventId')
      .sort({ createdAt: -1 });

    res.render('bookings/my-bookings', { title: 'My Bookings', bookings });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
};

// DELETE /bookings/:id — cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      req.flash('error', 'Booking not found.');
      return res.redirect('/bookings/my-bookings');
    }

    // Only the owner can cancel their booking
    if (booking.userId.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'You are not authorised to cancel this booking.');
      return res.redirect('/bookings/my-bookings');
    }

    // Restore tickets
    await Event.findByIdAndUpdate(booking.eventId, {
      $inc: { ticketsLeft: booking.quantity },
    });

    await Booking.findByIdAndDelete(req.params.id);

    req.flash('success', 'Booking cancelled and tickets released.');
    res.redirect('/bookings/my-bookings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not cancel booking.');
    res.redirect('/bookings/my-bookings');
  }
};

// GET /bookings/dashboard — admin analytics dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    // Total bookings count
    const totalBookings = await Booking.countDocuments();

    // Total tickets sold (sum of all quantities)
    const ticketsSoldAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    const totalTicketsSold = ticketsSoldAgg[0]?.total || 0;

    // Total revenue (join bookings with events to get price)
    const revenueAgg = await Booking.aggregate([
      {
        $lookup: {
          from:         'events',
          localField:   'eventId',
          foreignField: '_id',
          as:           'event',
        },
      },
      { $unwind: '$event' },
      {
        $group: {
          _id:   null,
          total: { $sum: { $multiply: ['$quantity', '$event.price'] } },
        },
      },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Top 5 most booked events
    const popularEvents = await Booking.aggregate([
      {
        $group: {
          _id:          '$eventId',
          totalBooked:  { $sum: '$quantity' },
          bookingCount: { $sum: 1 },
        },
      },
      { $sort: { totalBooked: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from:         'events',
          localField:   '_id',
          foreignField: '_id',
          as:           'event',
        },
      },
      { $unwind: '$event' },
      {
        $project: {
          _id:          0,
          title:        '$event.title',
          category:     '$event.category',
          date:         '$event.date',
          ticketsLeft:  '$event.ticketsLeft',
          capacity:     '$event.capacity',
          totalBooked:  1,
          bookingCount: 1,
        },
      },
    ]);

    // Bookings per category
    const categoryStats = await Booking.aggregate([
      {
        $lookup: {
          from:         'events',
          localField:   'eventId',
          foreignField: '_id',
          as:           'event',
        },
      },
      { $unwind: '$event' },
      {
        $group: {
          _id:         '$event.category',
          totalBooked: { $sum: '$quantity' },
        },
      },
      { $sort: { totalBooked: -1 } },
    ]);

    // Recent 10 bookings for activity feed
    const recentBookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('eventId', 'title date')
      .sort({ createdAt: -1 })
      .limit(10);

    res.render('bookings/dashboard', {
      title: 'Admin Dashboard',
      totalBookings,
      totalTicketsSold,
      totalRevenue,
      popularEvents,
      categoryStats,
      recentBookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
  }
};
