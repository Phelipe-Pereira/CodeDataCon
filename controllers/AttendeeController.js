const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const attendees = await dataProcessor.getAttendees();
            res.json(attendees.map(attendee => attendee.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const attendee = await dataProcessor.getAttendeeById(req.params.id);
            if (!attendee) {
                return res.status(404).json({ error: 'Participante não encontrado' });
            }
            res.json(attendee.toJSON());
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
