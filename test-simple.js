const { DataProcessor } = require('./services');

async function testSimple() {
    const dataProcessor = new DataProcessor();
    
    try {
        console.log('=== Teste Simples ===\n');
        
        console.log('1. Obtendo participantes:');
        const attendees = await dataProcessor.getAttendees();
        console.log(`- Total: ${attendees.length}`);
        console.log(`- Primeiro: ${JSON.stringify(attendees[0].toJSON(), null, 2)}\n`);
        
        console.log('2. Obtendo eventos:');
        const events = await dataProcessor.getEvents();
        console.log(`- Total: ${events.length}`);
        console.log(`- Primeiro: ${JSON.stringify(events[0].toJSON(), null, 2)}\n`);
        
        console.log('3. Obtendo puzzles:');
        const puzzles = await dataProcessor.getPuzzles();
        console.log(`- Total: ${puzzles.length}`);
        console.log(`- Primeiro: ${JSON.stringify(puzzles[0].toJSON(), null, 2)}\n`);
        
        console.log('4. Obtendo respostas de puzzles:');
        const puzzleAnswers = await dataProcessor.getPuzzleAnswers();
        console.log(`- Total: ${puzzleAnswers.length}`);
        console.log(`- Primeiro: ${JSON.stringify(puzzleAnswers[0].toJSON(), null, 2)}\n`);
        
        console.log('5. Obtendo tokens:');
        const tokens = await dataProcessor.getTokens();
        console.log(`- Total: ${tokens.length}`);
        console.log(`- Primeiro: ${JSON.stringify(tokens[0].toJSON(), null, 2)}\n`);
        
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

testSimple();
