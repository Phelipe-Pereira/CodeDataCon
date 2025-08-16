const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const puzzleAnswers = await dataProcessor.getPuzzleAnswers();
            res.json(puzzleAnswers.map(answer => answer.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
