const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const tokens = await dataProcessor.getTokens();
            res.json(tokens);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
