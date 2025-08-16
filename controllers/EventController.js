const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const events = await dataProcessor.getEvents();
            res.json(events);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
