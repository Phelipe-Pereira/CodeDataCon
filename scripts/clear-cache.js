const axios = require('axios');

async function clearCache() {
    try {
        console.log('🧹 Limpando cache via API...');
        
        const response = await axios.post('http://localhost:3001/api/cache/clear');
        console.log('✅ Cache limpo:', response.data.message);
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao limpar cache:', error.message);
        return false;
    }
}

async function forceRefresh() {
    try {
        console.log('🔄 Forçando refresh via API...');
        
        const response = await axios.post('http://localhost:3001/api/cache/refresh');
        console.log('✅ Refresh realizado:', response.data.message);
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao fazer refresh:', error.message);
        return false;
    }
}

async function getCacheInfo() {
    try {
        console.log('📊 Obtendo informações do cache...');
        
        const response = await axios.get('http://localhost:3001/api/cache/info');
        console.log('📋 Cache info:', response.data);
        
        return response.data;
    } catch (error) {
        console.error('❌ Erro ao obter cache info:', error.message);
        return null;
    }
}

module.exports = {
    clearCache,
    forceRefresh,
    getCacheInfo
};

if (require.main === module) {
    const command = process.argv[2];
    
    switch (command) {
        case 'clear':
            clearCache();
            break;
        case 'refresh':
            forceRefresh();
            break;
        case 'info':
            getCacheInfo();
            break;
        default:
            console.log('Uso: node clear-cache.js [clear|refresh|info]');
    }
}
