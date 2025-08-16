const DataProcessor = require('./DataProcessor');

class ReportService {
    constructor() {
        this.dataProcessor = new DataProcessor();
    }

    async generateAttendanceReport() {
        const [attendees, events, attendeeEvents] = await Promise.all([
            this.dataProcessor.getAttendees(),
            this.dataProcessor.getEvents(),
            this.dataProcessor.getAttendeeEvents()
        ]);

        const eventAttendance = events.map(event => {
            const eventAttendees = attendeeEvents.filter(ae => ae.eventId === event.id);
            return {
                eventId: event.id,
                eventName: event.name,
                eventDate: event.date,
                totalAttendees: eventAttendees.length,
                attendees: eventAttendees.map(ae => {
                    const attendee = attendees.find(a => a.id === ae.attendeeId);
                    return {
                        id: ae.attendeeId,
                        name: attendee ? attendee.name : 'Unknown',
                        email: attendee ? attendee.email : ''
                    };
                })
            };
        });

        return {
            totalEvents: events.length,
            totalAttendees: attendees.length,
            eventAttendance,
            averageAttendance: eventAttendance.reduce((sum, event) => sum + event.totalAttendees, 0) / events.length
        };
    }

    async generatePuzzlePerformanceReport() {
        const [puzzles, puzzleAnswers, attendees] = await Promise.all([
            this.dataProcessor.getPuzzles(),
            this.dataProcessor.getPuzzleAnswers(),
            this.dataProcessor.getAttendees()
        ]);

        const puzzleStats = puzzles.map(puzzle => {
            const puzzleAnswersForPuzzle = puzzleAnswers.filter(pa => pa.puzzleId === puzzle.id);
            const correctAnswers = puzzleAnswersForPuzzle.filter(pa => pa.isCorrect);
            const totalAttempts = puzzleAnswersForPuzzle.length;
            const successRate = totalAttempts > 0 ? (correctAnswers.length / totalAttempts) * 100 : 0;

            return {
                puzzleId: puzzle.id,
                title: puzzle.title,
                difficulty: puzzle.difficulty,
                points: puzzle.points,
                totalAttempts,
                correctAnswers: correctAnswers.length,
                successRate,
                averageAttemptsPerPerson: totalAttempts / attendees.length
            };
        });

        const overallStats = {
            totalPuzzles: puzzles.length,
            totalAttempts: puzzleAnswers.length,
            totalCorrectAnswers: puzzleAnswers.filter(pa => pa.isCorrect).length,
            overallSuccessRate: puzzleAnswers.length > 0 ? 
                (puzzleAnswers.filter(pa => pa.isCorrect).length / puzzleAnswers.length) * 100 : 0
        };

        return {
            overallStats,
            puzzleStats,
            difficultyBreakdown: this.breakdownByDifficulty(puzzleStats)
        };
    }

    async generateTokenReport() {
        const [tokens, tokenClaims, attendees] = await Promise.all([
            this.dataProcessor.getTokens(),
            this.dataProcessor.getTokenClaims(),
            this.dataProcessor.getAttendees()
        ]);

        const tokenStats = tokens.map(token => {
            const claimsForToken = tokenClaims.filter(tc => tc.tokenId === token.id);
            return {
                tokenId: token.id,
                name: token.name,
                value: token.value,
                type: token.type,
                totalClaims: claimsForToken.length,
                uniqueClaimers: new Set(claimsForToken.map(tc => tc.attendeeId)).size,
                totalValueClaimed: claimsForToken.length * token.value
            };
        });

        const claimerStats = {};
        tokenClaims.forEach(claim => {
            if (!claimerStats[claim.attendeeId]) {
                claimerStats[claim.attendeeId] = { totalClaims: 0, totalValue: 0 };
            }
            const token = tokens.find(t => t.id === claim.tokenId);
            claimerStats[claim.attendeeId].totalClaims++;
            claimerStats[claim.attendeeId].totalValue += token ? token.value : 0;
        });

        const topClaimers = Object.entries(claimerStats)
            .map(([attendeeId, stats]) => {
                const attendee = attendees.find(a => a.id === attendeeId);
                return {
                    attendeeId,
                    name: attendee ? attendee.name : 'Unknown',
                    email: attendee ? attendee.email : '',
                    totalClaims: stats.totalClaims,
                    totalValue: stats.totalValue
                };
            })
            .sort((a, b) => b.totalValue - a.totalValue)
            .slice(0, 10);

        return {
            totalTokens: tokens.length,
            totalClaims: tokenClaims.length,
            totalValueClaimed: tokenStats.reduce((sum, token) => sum + token.totalValueClaimed, 0),
            tokenStats,
            topClaimers
        };
    }

    async generateAttendeeReport(attendeeId) {
        const [attendee, attendeeEvents, puzzleAnswers, tokenClaims, events, puzzles, tokens] = await Promise.all([
            this.dataProcessor.getAttendeeById(attendeeId),
            this.dataProcessor.getAttendeeEvents(attendeeId),
            this.dataProcessor.getAttendeePuzzleAnswers(attendeeId),
            this.dataProcessor.getAttendeeTokenClaims(attendeeId),
            this.dataProcessor.getEvents(),
            this.dataProcessor.getPuzzles(),
            this.dataProcessor.getTokens()
        ]);

        if (!attendee) return null;

        const eventsAttended = attendeeEvents.map(ae => {
            const event = events.find(e => e.id === ae.eventId);
            return {
                eventId: ae.eventId,
                eventName: event ? event.name : 'Unknown',
                eventDate: event ? event.date : null
            };
        });

        const puzzlePerformance = puzzleAnswers.map(pa => {
            const puzzle = puzzles.find(p => p.id === pa.puzzleId);
            return {
                puzzleId: pa.puzzleId,
                puzzleTitle: puzzle ? puzzle.title : 'Unknown',
                answer: pa.answer,
                isCorrect: pa.isCorrect,
                submittedAt: pa.submittedAt,
                points: puzzle ? puzzle.points : 0
            };
        });

        const tokenClaimHistory = tokenClaims.map(tc => {
            const token = tokens.find(t => t.id === tc.tokenId);
            return {
                tokenId: tc.tokenId,
                tokenName: token ? token.name : 'Unknown',
                tokenValue: token ? token.value : 0,
                claimedAt: tc.claimedAt,
                status: tc.status
            };
        });

        const totalCorrectAnswers = puzzleAnswers.filter(pa => pa.isCorrect).length;
        const totalScore = puzzlePerformance
            .filter(pp => pp.isCorrect)
            .reduce((sum, pp) => sum + pp.points, 0);

        return {
            attendee: {
                id: attendee.id,
                name: attendee.name,
                email: attendee.email
            },
            eventsAttended: eventsAttended.length,
            events: eventsAttended,
            puzzlePerformance: {
                totalAttempts: puzzleAnswers.length,
                correctAnswers: totalCorrectAnswers,
                successRate: puzzleAnswers.length > 0 ? (totalCorrectAnswers / puzzleAnswers.length) * 100 : 0,
                totalScore,
                details: puzzlePerformance
            },
            tokenClaims: {
                totalClaims: tokenClaims.length,
                totalValue: tokenClaimHistory.reduce((sum, tc) => sum + tc.tokenValue, 0),
                history: tokenClaimHistory
            }
        };
    }

    async generateEventReport(eventId) {
        const [event, eventAttendees, attendeeEvents, puzzleAnswers, tokens] = await Promise.all([
            this.dataProcessor.getEventById(eventId),
            this.dataProcessor.getEventAttendees(eventId),
            this.dataProcessor.getAttendeeEvents(),
            this.dataProcessor.getPuzzleAnswers(),
            this.dataProcessor.getTokens()
        ]);

        if (!event) return null;

        const eventAttendeeIds = eventAttendees.map(a => a.id);
        const eventPuzzleAnswers = puzzleAnswers.filter(pa => 
            eventAttendeeIds.includes(pa.attendeeId)
        );

        const attendeePerformance = eventAttendees.map(attendee => {
            const attendeeAnswers = eventPuzzleAnswers.filter(pa => pa.attendeeId === attendee.id);
            const correctAnswers = attendeeAnswers.filter(pa => pa.isCorrect);
            const score = correctAnswers.reduce((sum, pa) => {
                const token = tokens.find(t => t.id === pa.puzzleId);
                return sum + (token ? token.value : 0);
            }, 0);

            return {
                attendeeId: attendee.id,
                name: attendee.name,
                email: attendee.email,
                totalAttempts: attendeeAnswers.length,
                correctAnswers: correctAnswers.length,
                successRate: attendeeAnswers.length > 0 ? (correctAnswers.length / attendeeAnswers.length) * 100 : 0,
                score
            };
        });

        const overallStats = {
            totalAttendees: eventAttendees.length,
            totalAttempts: eventPuzzleAnswers.length,
            totalCorrectAnswers: eventPuzzleAnswers.filter(pa => pa.isCorrect).length,
            averageSuccessRate: eventPuzzleAnswers.length > 0 ? 
                (eventPuzzleAnswers.filter(pa => pa.isCorrect).length / eventPuzzleAnswers.length) * 100 : 0,
            averageScore: attendeePerformance.reduce((sum, ap) => sum + ap.score, 0) / eventAttendees.length
        };

        return {
            event: {
                id: event.id,
                name: event.name,
                date: event.date,
                description: event.description
            },
            overallStats,
            attendeePerformance: attendeePerformance.sort((a, b) => b.score - a.score)
        };
    }

    breakdownByDifficulty(puzzleStats) {
        const breakdown = {};
        puzzleStats.forEach(stat => {
            const difficulty = stat.difficulty || 'Unknown';
            if (!breakdown[difficulty]) {
                breakdown[difficulty] = {
                    count: 0,
                    totalAttempts: 0,
                    totalCorrect: 0,
                    averageSuccessRate: 0
                };
            }
            breakdown[difficulty].count++;
            breakdown[difficulty].totalAttempts += stat.totalAttempts;
            breakdown[difficulty].totalCorrect += stat.correctAnswers;
        });

        Object.keys(breakdown).forEach(difficulty => {
            const stats = breakdown[difficulty];
            stats.averageSuccessRate = stats.totalAttempts > 0 ? 
                (stats.totalCorrect / stats.totalAttempts) * 100 : 0;
        });

        return breakdown;
    }
}

module.exports = ReportService;
