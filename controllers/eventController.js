const Event = require("../models/Event");

exports.getEvents = async (req, res) => {

    try {

        const {
            title,
            category,
            date,
            available
        } = req.query;

        let filter = {};

        // SEARCH BY TITLE
        if (title) {

            filter.title = {
                $regex: title,
                $options: "i"
            };

        }

        // FILTER BY CATEGORY
        if (category) {

            filter.category = category;

        }

        // FILTER BY DATE
        if (date) {

            filter.date = {
                $gte: new Date(date)
            };

        }

        // FILTER AVAILABLE EVENTS
        if (available === "true") {

            filter.ticketsLeft = {
                $gt: 0
            };

        }

        const events = await Event.find(filter);

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};