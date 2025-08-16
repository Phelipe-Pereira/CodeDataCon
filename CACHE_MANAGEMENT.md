# 🧹 Gerenciamento de Cache

## 📋 Visão Geral

O sistema possui um sistema de cache inteligente que garante que os dados estejam sempre atualizados e evita problemas de performance.

## 🔧 Estratégias de Limpeza de Cache

### 1. **Auto-clear Automático**
- **Intervalo**: A cada 30 minutos
- **Funcionamento**: Limpa automaticamente o cache para garantir dados frescos
- **Status**: Ativado automaticamente quando o servidor inicia

### 2. **Expiração por Tempo**
- **Duração**: 5 minutos por item
- **Funcionamento**: Cada item do cache expira individualmente
- **Limpeza**: Itens expirados são removidos automaticamente

### 3. **Limpeza Manual**
- **Via API**: Endpoints para limpeza manual
- **Via Scripts**: Comandos npm para gerenciamento

## 🚀 Como Usar

### Via API (HTTP)

```bash
# Limpar cache
curl -X POST http://localhost:3001/api/cache/clear

# Forçar refresh completo
curl -X POST http://localhost:3001/api/cache/refresh

# Ver informações do cache
curl http://localhost:3001/api/cache/info
```

### Via Scripts NPM

```bash
# Limpar cache
npm run cache:clear

# Forçar refresh
npm run cache:refresh

# Ver informações
npm run cache:info
```

### Via Script Direto

```bash
# Limpar cache
node scripts/clear-cache.js clear

# Forçar refresh
node scripts/clear-cache.js refresh

# Ver informações
node scripts/clear-cache.js info
```

## 📊 Endpoints de Cache

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/cache/clear` | Limpa todo o cache |
| `POST` | `/api/cache/refresh` | Força refresh completo |
| `GET` | `/api/cache/info` | Informações do cache |

## 🔍 Monitoramento

### Logs Automáticos
- Limpeza automática é logada no console
- Timestamp de cada limpeza é registrado
- Status do auto-clear é exibido no startup

### Informações do Cache
```json
{
  "cacheInfo": {
    "attendees": { "hasData": true, "timestamp": 1234567890, "age": 300000 },
    "events": { "hasData": true, "timestamp": 1234567890, "age": 300000 }
  },
  "lastCacheClear": 1234567890,
  "cacheExpiry": 300000
}
```

## ⚡ Benefícios

1. **Performance**: Cache reduz tempo de resposta
2. **Confiabilidade**: Dados sempre atualizados
3. **Flexibilidade**: Múltiplas formas de gerenciar
4. **Monitoramento**: Visibilidade completa do estado

## 🛠️ Configuração

### Alterar Intervalo de Auto-clear
No arquivo `server.js`:
```javascript
cacheManager.startAutoClear(60); // 60 minutos
```

### Alterar Expiração do Cache
No arquivo `services/DataProcessor.js`:
```javascript
this.cacheExpiry = 10 * 60 * 1000; // 10 minutos
```

## 🚨 Troubleshooting

### Cache não está sendo limpo
1. Verifique se o servidor está rodando
2. Execute `npm run cache:clear`
3. Reinicie o servidor se necessário

### Dados desatualizados
1. Execute `npm run cache:refresh`
2. Aguarde o próximo auto-clear
3. Verifique logs do servidor

### Performance lenta
1. Verifique informações do cache: `npm run cache:info`
2. Limpe o cache manualmente se necessário
3. Ajuste intervalos de limpeza se necessário
