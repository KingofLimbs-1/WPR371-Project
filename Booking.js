const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'User is required'],
    },
    eventId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Event',
      required: [true, 'Event is required'],
    },
    quantity: {
      type:    Number,
      default: 1,
      min:     [1, 'Quantity must be at least 1'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
