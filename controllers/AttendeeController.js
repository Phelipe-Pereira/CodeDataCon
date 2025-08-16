const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const attendees = await dataProcessor.getAttendees();
            res.json(attendees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
