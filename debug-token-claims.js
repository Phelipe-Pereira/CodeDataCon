const DataProcessor = require('./services/DataProcessor');

async function debugTokenClaims() {
    const dataProcessor = new DataProcessor();
    
    try {
        console.log('🔍 Debugando getTokenClaims...');
        
        const claims = await dataProcessor.getTokenClaims();
        console.log('📊 Tipo de claims:', typeof claims);
        console.log('📊 É array?', Array.isArray(claims));
        console.log('📊 Claims:', claims);
        
        if (Array.isArray(claims)) {
            console.log('✅ Claims é um array com', claims.length, 'itens');
            console.log('📋 Primeiro item:', claims[0]);
        } else {
            console.log('❌ Claims não é um array!');
            console.log('📋 Valor de claims:', claims);
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

debugTokenClaims();
