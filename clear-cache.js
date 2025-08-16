const DataProcessor = require('./services/DataProcessor');

async function clearCache() {
    const dataProcessor = new DataProcessor();
    
    try {
        console.log('🧹 Limpando cache...');
        dataProcessor.clearCache();
        console.log('✅ Cache limpo!');
        
        console.log('🔄 Testando getTokenClaims após limpeza...');
        const claims = await dataProcessor.getTokenClaims();
        console.log('📊 Claims após limpeza:', Array.isArray(claims) ? `${claims.length} itens` : 'Não é array');
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

clearCache();
