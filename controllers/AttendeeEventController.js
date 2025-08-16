const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const attendeeEvents = await dataProcessor.getAttendeeEvents();
            res.json(attendeeEvents.map(ae => ae.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
