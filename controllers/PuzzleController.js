const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const puzzles = await dataProcessor.getPuzzles();
            res.json(puzzles.map(puzzle => puzzle.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const puzzle = await dataProcessor.getPuzzleById(req.params.id);
            if (!puzzle) {
                return res.status(404).json({ error: 'Puzzle não encontrado' });
            }
            res.json(puzzle.toJSON());
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
