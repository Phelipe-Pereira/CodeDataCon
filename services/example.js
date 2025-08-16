const { DataProcessor, ReportService } = require('./index');

async function example() {
    const dataProcessor = new DataProcessor();
    const reportService = new ReportService();

    try {
        console.log('=== Exemplo de uso dos serviços ===\n');

        console.log('1. Obtendo estatísticas do dashboard:');
        const dashboardStats = await dataProcessor.getDashboardStats();
        console.log(`- Total de participantes: ${dashboardStats.totalAttendees}`);
        console.log(`- Total de eventos: ${dashboardStats.totalEvents}`);
        console.log(`- Total de puzzles: ${dashboardStats.totalPuzzles}`);
        console.log(`- Taxa de conclusão: ${dashboardStats.puzzleCompletionRate.toFixed(2)}%\n`);

        console.log('2. Top 5 performers:');
        const topPerformers = await dataProcessor.getTopPerformers(5);
        topPerformers.forEach((performer, index) => {
            console.log(`${index + 1}. ${performer.name} - ${performer.totalScore} pontos`);
        });
        console.log();

        console.log('3. Relatório de participação:');
        const attendanceReport = await reportService.generateAttendanceReport();
        console.log(`- Total de eventos: ${attendanceReport.totalEvents}`);
        console.log(`- Média de participação: ${attendanceReport.averageAttendance.toFixed(2)} pessoas\n`);

        console.log('4. Relatório de performance dos puzzles:');
        const puzzleReport = await reportService.generatePuzzlePerformanceReport();
        console.log(`- Taxa de sucesso geral: ${puzzleReport.overallStats.overallSuccessRate.toFixed(2)}%`);
        console.log(`- Total de tentativas: ${puzzleReport.overallStats.totalAttempts}\n`);

        console.log('5. Relatório de tokens:');
        const tokenReport = await reportService.generateTokenReport();
        console.log(`- Total de tokens: ${tokenReport.totalTokens}`);
        console.log(`- Total de claims: ${tokenReport.totalClaims}`);
        console.log(`- Valor total reclamado: ${tokenReport.totalValueClaimed}\n`);

        console.log('6. Informações do cache:');
        const cacheInfo = dataProcessor.getCacheInfo();
        console.log('Cache entries:', Object.keys(cacheInfo).length);
        Object.entries(cacheInfo).forEach(([key, info]) => {
            console.log(`- ${key}: ${info.hasData ? 'Com dados' : 'Sem dados'} (idade: ${info.age}ms)`);
        });

    } catch (error) {
        console.error('Erro:', error.message);
    }
}

if (require.main === module) {
    example();
}

module.exports = { example };
