const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const puzzles = await dataProcessor.getPuzzles();
            res.json(puzzles);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
