const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const tokenClaims = await dataProcessor.getTokenClaims();
            res.json(tokenClaims);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
