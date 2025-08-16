const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async clearCache(req, res) {
        try {
            dataProcessor.clearCache();
            res.json({ 
                message: 'Cache limpo com sucesso',
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async forceRefresh(req, res) {
        try {
            dataProcessor.forceRefresh();
            res.json({ 
                message: 'Refresh forçado realizado com sucesso',
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getCacheInfo(req, res) {
        try {
            const cacheInfo = dataProcessor.getCacheInfo();
            res.json({
                cacheInfo,
                lastCacheClear: dataProcessor.lastCacheClear,
                cacheExpiry: dataProcessor.cacheExpiry
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
