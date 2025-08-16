const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const cacheManager = require('./middleware/cacheManager');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando!' });
});

app.use('/api', router);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((error, req, res, next) => {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 API disponível em: http://localhost:${PORT}/api`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    
    cacheManager.startAutoClear(30);
    console.log('🧹 Auto-clear de cache ativado (30 minutos)');
});

module.exports = app;
