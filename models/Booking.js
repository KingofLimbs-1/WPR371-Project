const mongoose = require('mongoose');

const bookingSchema = new.mongoose.Schema({
    userID:{
            type: String,
            required: [true, 'ID is required'],
            unique: [true]
    },
    eventID:{
            type: String,
            required: [true, 'event ID is required'],
            unique : [true]
    },
    quantity:{
            type: String,
            required: [true, 'password is required'],
            select :[false]
    },
    createdAt:{
            type: Date,
            default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);