const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getStats(req, res) {
        try {
            const stats = await dataProcessor.getDashboardStats();
            res.json(stats.toJSON());
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
