const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const {
    Attendee,
    Event,
    AttendeeEvent,
    Puzzle,
    PuzzleAnswer,
    Token,
    TokenClaim,
    DashboardStats,
    EventAnalytics
} = require('../entities');

class DataProcessor {
    constructor() {
        this.csvPath = path.join(__dirname, '..', 'baseCsv');
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000;
        this.lastCacheClear = Date.now();
    }

    async readCSVFile(filename) {
        const filePath = path.join(this.csvPath, filename);
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    async getAttendees() {
        const cacheKey = 'attendees';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('attendee.csv');
        const attendees = csvData.map(data => Attendee.fromCSV(data));
        
        this.setCache(cacheKey, attendees);
        return attendees;
    }

    async getEvents() {
        const cacheKey = 'events';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('event.csv');
        const events = csvData.map(data => Event.fromCSV(data));
        
        this.setCache(cacheKey, events);
        return events;
    }

    async getAttendeeEvents() {
        const cacheKey = 'attendeeEvents';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('attendee_event.csv');
        const attendeeEvents = csvData.map(data => AttendeeEvent.fromCSV(data));
        
        this.setCache(cacheKey, attendeeEvents);
        return attendeeEvents;
    }

    async getPuzzles() {
        const cacheKey = 'puzzles';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('puzzle.csv');
        const puzzles = csvData.map(data => Puzzle.fromCSV(data));
        
        this.setCache(cacheKey, puzzles);
        return puzzles;
    }

    async getPuzzleAnswers() {
        const cacheKey = 'puzzleAnswers';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('puzzle_answer.csv');
        const puzzleAnswers = csvData.map(data => PuzzleAnswer.fromCSV(data));
        
        this.setCache(cacheKey, puzzleAnswers);
        return puzzleAnswers;
    }

    async getTokens() {
        const cacheKey = 'tokens';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('token.csv');
        const tokens = csvData.map(data => Token.fromCSV(data));
        
        this.setCache(cacheKey, tokens);
        return tokens;
    }

    async getTokenClaims() {
        const cacheKey = 'tokenClaims';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const csvData = await this.readCSVFile('token_claim.csv');
        const tokenClaims = csvData.map(data => TokenClaim.fromCSV(data));
        
        this.setCache(cacheKey, tokenClaims);
        return tokenClaims;
    }

    async getDashboardStats() {
        const cacheKey = 'dashboardStats';
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const [attendees, events, puzzles, tokens, puzzleAnswers, tokenClaims] = await Promise.all([
            this.getAttendees(),
            this.getEvents(),
            this.getPuzzles(),
            this.getTokens(),
            this.getPuzzleAnswers(),
            this.getTokenClaims()
        ]);

        const stats = DashboardStats.createFromData(
            attendees, events, puzzles, tokens, puzzleAnswers, tokenClaims
        );
        
        this.setCache(cacheKey, stats);
        return stats;
    }

    async getEventAnalytics(eventId = null) {
        const cacheKey = `eventAnalytics_${eventId || 'all'}`;
        if (this.isCacheValid(cacheKey)) {
            return this.getCachedData(cacheKey);
        }

        const [events, attendeeEvents, puzzleAnswers, tokens, tokenClaims] = await Promise.all([
            this.getEvents(),
            this.getAttendeeEvents(),
            this.getPuzzleAnswers(),
            this.getTokens(),
            this.getTokenClaims()
        ]);

        const targetEvents = eventId ? events.filter(e => e.id === eventId) : events;
        const analytics = targetEvents.map(event => 
            EventAnalytics.createFromEventData(event, attendeeEvents, puzzleAnswers, tokens, tokenClaims)
        );
        
        this.setCache(cacheKey, analytics);
        return analytics;
    }



    async getAttendeeById(attendeeId) {
        const attendees = await this.getAttendees();
        return attendees.find(attendee => attendee.id === attendeeId);
    }

    async getEventById(eventId) {
        const events = await this.getEvents();
        return events.find(event => event.id === eventId);
    }

    async getPuzzleById(puzzleId) {
        const puzzles = await this.getPuzzles();
        return puzzles.find(puzzle => puzzle.id === puzzleId);
    }

    async getTokenById(tokenId) {
        const tokens = await this.getTokens();
        return tokens.find(token => token.id === tokenId);
    }

    async getAttendeeEventsByAttendeeId(attendeeId) {
        const attendeeEvents = await this.getAttendeeEvents();
        return attendeeEvents.filter(ae => ae.attendeeId === attendeeId);
    }

    async getEventAttendees(eventId) {
        const attendeeEvents = await this.getAttendeeEvents();
        const attendees = await this.getAttendees();
        
        const eventAttendeeIds = attendeeEvents
            .filter(ae => ae.eventId === eventId)
            .map(ae => ae.attendeeId);
        
        return attendees.filter(attendee => eventAttendeeIds.includes(attendee.id));
    }

    async getAttendeePuzzleAnswers(attendeeId) {
        const puzzleAnswers = await this.getPuzzleAnswers();
        return puzzleAnswers.filter(answer => answer.attendeeId === attendeeId);
    }

    async getAttendeeTokenClaims(attendeeId) {
        const tokenClaims = await this.getTokenClaims();
        return tokenClaims.filter(claim => claim.attendeeId === attendeeId);
    }

    async getTopPerformers(limit = 10) {
        const [attendees, puzzleAnswers, tokens] = await Promise.all([
            this.getAttendees(),
            this.getPuzzleAnswers(),
            this.getTokens()
        ]);

        const performerStats = {};
        
        puzzleAnswers.forEach(answer => {
            if (answer.status === 'DONE') {
                if (!performerStats[answer.attendeeUuid]) {
                    performerStats[answer.attendeeUuid] = { correctAnswers: 0, totalScore: 0 };
                }
                performerStats[answer.attendeeUuid].correctAnswers++;
                
                const token = tokens.find(t => t.id === answer.puzzleId);
                if (token) {
                    performerStats[answer.attendeeUuid].totalScore += token.value;
                }
            }
        });

        return Object.entries(performerStats)
            .map(([attendeeUuid, stats]) => {
                const attendee = attendees.find(a => a.uuid === attendeeUuid);
                return {
                    attendeeUuid,
                    name: attendee ? `Participante ${attendee.id}` : 'Unknown',
                    city: attendee ? attendee.city : '',
                    correctAnswers: stats.correctAnswers,
                    totalScore: stats.totalScore
                };
            })
            .sort((a, b) => b.totalScore - a.totalScore)
            .slice(0, limit);
    }

    async getEventPerformance(eventId) {
        const [event, attendeeEvents, puzzleAnswers, tokens] = await Promise.all([
            this.getEventById(eventId),
            this.getAttendeeEvents(),
            this.getPuzzleAnswers(),
            this.getTokens()
        ]);

        if (!event) return null;

        const eventAttendees = attendeeEvents.filter(ae => ae.eventId === eventId);
        const eventAttendeeIds = eventAttendees.map(ae => ae.attendeeId);

        const eventPuzzleAnswers = puzzleAnswers.filter(answer => 
            eventAttendeeIds.includes(answer.attendeeId)
        );

        const totalAnswers = eventPuzzleAnswers.length;
        const correctAnswers = eventPuzzleAnswers.filter(answer => answer.isCorrect).length;
        const completionRate = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

        const scores = eventPuzzleAnswers
            .filter(answer => answer.isCorrect)
            .map(answer => {
                const token = tokens.find(t => t.id === answer.puzzleId);
                return token ? token.value : 0;
            });

        const averageScore = scores.length > 0 ? 
            scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

        return {
            eventId: event.id,
            eventName: event.name,
            attendeeCount: eventAttendees.length,
            totalAnswers,
            correctAnswers,
            completionRate,
            averageScore
        };
    }

    isCacheValid(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;
        
        const now = Date.now();
        const isExpired = (now - cached.timestamp) >= this.cacheExpiry;
        const isStale = (now - this.lastCacheClear) > (10 * 60 * 1000);
        
        if (isExpired || isStale) {
            this.cache.delete(key);
            return false;
        }
        
        return true;
    }

    getCachedData(key) {
        const cached = this.cache.get(key);
        return cached ? cached.data : null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data: data.data || data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
        this.lastCacheClear = Date.now();
        console.log('🧹 Cache limpo em:', new Date().toISOString());
    }

    forceRefresh() {
        this.clearCache();
        console.log('🔄 Forçando refresh de todos os dados...');
    }

    getCacheInfo() {
        const info = {};
        for (const [key, value] of this.cache.entries()) {
            info[key] = {
                hasData: !!value.data,
                timestamp: value.timestamp,
                age: Date.now() - value.timestamp
            };
        }
        return info;
    }
}

module.exports = DataProcessor;
