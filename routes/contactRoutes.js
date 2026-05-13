const express = require("express");
const router = express.Router();

const {
    createContact,
    getContacts
} = require("../controllers/contactController");

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

const {
    isAdmin
} = require("../middleware/roleMiddleware");

// POST CONTACT FORM
router.post("/models/Contact.js", async (req,res) => {
    try {
        const contact = await createContact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({error:'failed to create enquiry'});
    }
});

// PUBLIC CONTACT FORM
router.get("/", (req, res) => {
    res.render("contact", {
        title: "Contact Us"
    });
});

// GET ALL CONTACTS
router.get("/models/Enquiry.js", async (req,res) => {
    try {
        const enquiries = await createContact.find().sort({createdAt: -1});
        res.json(enquiries);
    } catch (error) {
         res.status(500).json({error:'failed to create enquiry'});
    }
});

// ANY USER CAN SUBMIT
router.post("/", createContact);


// ONLY ADMIN CAN VIEW ALL ENQUIRIES
router.get(
    "/admin",
    isAuthenticated,
    isAdmin,
    getContacts
);

//read one
router.get('/', async (req,res) => {
    try {
        const enquiry = await createContact.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({error: 'not found'});
        }
        res.json(enquiry);
    } catch (error) {
        res.status(500).json({error: 'Error'});
    }
});

//UPDATE

router.put('/', async (req,res) => {
    try {
        const update = await createContact.findByIdAndUpdate(req.params.id, req.body,{new:true});

        if (!update) {
            return res.status(404).json({error: 'not found'});
        }
        res.json(update);
    } catch (error) {
        res.status(500).json({error: 'update failed'});
    }
});

//Delete

router.delete('/', async (req,res) => {
    try {
        const deleted = await createContact.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({error: 'not found'});
        }
        res.json({message: 'enquiry deleted'});
    } catch (error) {
        res.status(500).json({error: 'update failed'});
    }
});


// Form page
router.get('/', getContacts.showForm);

// Submit form
router.post('/', getContacts.submitEnquiry);

// Admin view
router.get('/', getContacts.getEnquiries);


module.exports = router;




module.exports = router;
