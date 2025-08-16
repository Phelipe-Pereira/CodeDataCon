const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const puzzleAnswers = await dataProcessor.getPuzzleAnswers();
            res.json(puzzleAnswers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
