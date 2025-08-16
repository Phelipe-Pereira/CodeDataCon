class DashboardStats {
    constructor(data) {
        this.totalAttendees = data.totalAttendees || 0;
        this.totalEvents = data.totalEvents || 0;
        this.totalPuzzles = data.totalPuzzles || 0;
        this.totalTokens = data.totalTokens || 0;
        this.activeEvents = data.activeEvents || [];
        this.topPuzzleSolvers = data.topPuzzleSolvers || [];
        this.recentTokenClaims = data.recentTokenClaims || [];
        this.puzzleCompletionRate = data.puzzleCompletionRate || 0;
        this.averageScore = data.averageScore || 0;
    }

    static createFromData(attendees, events, puzzles, tokens, puzzleAnswers, tokenClaims) {
        const totalAttendees = attendees.length;
        const totalEvents = events.length;
        const totalPuzzles = puzzles.length;
        const totalTokens = tokens.length;

        const activeEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            return eventDate >= today;
        });

        const puzzleSolverStats = {};
        puzzleAnswers.forEach(answer => {
            if (answer.isCorrect) {
                if (!puzzleSolverStats[answer.attendeeId]) {
                    puzzleSolverStats[answer.attendeeId] = 0;
                }
                puzzleSolverStats[answer.attendeeId]++;
            }
        });

        const topPuzzleSolvers = Object.entries(puzzleSolverStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([attendeeId, count]) => {
                const attendee = attendees.find(a => a.id === attendeeId);
                return {
                    attendeeId,
                    name: attendee ? attendee.name : 'Unknown',
                    correctAnswers: count
                };
            });

        const recentTokenClaims = tokenClaims
            .sort((a, b) => new Date(b.claimedAt) - new Date(a.claimedAt))
            .slice(0, 10);

        const totalAnswers = puzzleAnswers.length;
        const correctAnswers = puzzleAnswers.filter(answer => answer.isCorrect).length;
        const puzzleCompletionRate = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

        return new DashboardStats({
            totalAttendees,
            totalEvents,
            totalPuzzles,
            totalTokens,
            activeEvents,
            topPuzzleSolvers,
            recentTokenClaims,
            puzzleCompletionRate
        });
    }

    toJSON() {
        return {
            totalAttendees: this.totalAttendees,
            totalEvents: this.totalEvents,
            totalPuzzles: this.totalPuzzles,
            totalTokens: this.totalTokens,
            activeEvents: this.activeEvents,
            topPuzzleSolvers: this.topPuzzleSolvers,
            recentTokenClaims: this.recentTokenClaims,
            puzzleCompletionRate: this.puzzleCompletionRate,
            averageScore: this.averageScore
        };
    }
}

module.exports = DashboardStats;
