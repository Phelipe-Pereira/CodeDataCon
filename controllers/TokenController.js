const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getAll(req, res) {
        try {
            const tokens = await dataProcessor.getTokens();
            res.json(tokens.map(token => token.toJSON()));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const token = await dataProcessor.getTokenById(req.params.id);
            if (!token) {
                return res.status(404).json({ error: 'Token não encontrado' });
            }
            res.json(token.toJSON());
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
