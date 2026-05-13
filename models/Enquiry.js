const mongoose = require('mongoose');
/*const bcrypt = require('bcrypt');*/

const enquirySchema = new.mongoose.Schema({
    name:{
            type: String,
            required: [true, 'name is required']
    },
    email:{
            type: String,
            required: [true, 'email is required'],
            unique : [true]
    },
    message:{
            type: String,
            required: [true, 'Message is required'],
    },
    createdAt:{
            type: Date,
            default: Date.now
    }
});

module.exports = mongoose.model('Enquiry',enquirySchema);