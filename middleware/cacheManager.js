const DataProcessor = require('../services/DataProcessor');

class CacheManager {
    constructor() {
        this.dataProcessor = new DataProcessor();
        this.autoClearInterval = null;
        this.lastAutoClear = Date.now();
    }

    startAutoClear(intervalMinutes = 30) {
        if (this.autoClearInterval) {
            clearInterval(this.autoClearInterval);
        }

        this.autoClearInterval = setInterval(() => {
            this.clearCache();
        }, intervalMinutes * 60 * 1000);

        console.log(`🔄 Auto-clear configurado para ${intervalMinutes} minutos`);
    }

    stopAutoClear() {
        if (this.autoClearInterval) {
            clearInterval(this.autoClearInterval);
            this.autoClearInterval = null;
            console.log('⏹️ Auto-clear parado');
        }
    }

    clearCache() {
        this.dataProcessor.clearCache();
        this.lastAutoClear = Date.now();
        console.log('🧹 Cache limpo automaticamente');
    }

    getStatus() {
        return {
            autoClearActive: !!this.autoClearInterval,
            lastAutoClear: this.lastAutoClear,
            dataProcessor: this.dataProcessor
        };
    }
}

const cacheManager = new CacheManager();

module.exports = cacheManager;
