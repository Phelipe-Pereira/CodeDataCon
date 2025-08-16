const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAnalytics(req, res) {
        try {
            const { eventId } = req.params;
            const analytics = await dataProcessor.getEventAnalytics(eventId);
            res.json(analytics);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
