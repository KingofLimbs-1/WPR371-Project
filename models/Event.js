const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['conference', 'workshop', 'concert', 'festival', 'private'],
    required: [true, 'Category is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  ticketsLeft: {
    type: Number,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

// Auto-set ticketsLeft to capacity when creating a new event
eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.ticketsLeft = this.capacity;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);