const Contact = require("../models/Contact");


// CREATE CONTACT MESSAGE
exports.createContact = async (req, res) => {

    try {

        const contact = await Contact.create(req.body);

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: contact
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET ALL CONTACTS (ADMIN)
exports.getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};