const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const events = await dataProcessor.getEvents();
            res.json(events.map(event => event.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const event = await dataProcessor.getEventById(req.params.id);
            if (!event) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }
            res.json(event.toJSON());
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAttendees(req, res) {
        try {
            const attendees = await dataProcessor.getEventAttendees(req.params.id);
            res.json(attendees.map(attendee => attendee.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
