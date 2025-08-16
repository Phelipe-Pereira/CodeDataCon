class EventAnalytics {
    constructor(data) {
        this.eventId = data.eventId;
        this.eventName = data.eventName;
        this.attendeeCount = data.attendeeCount || 0;
        this.puzzleCompletionRate = data.puzzleCompletionRate || 0;
        this.averageScore = data.averageScore || 0;
        this.totalPuzzles = data.totalPuzzles || 0;
        this.completedPuzzles = data.completedPuzzles || 0;
        this.tokenClaimsCount = data.tokenClaimsCount || 0;
    }

    static createFromEventData(event, attendeeEvents, puzzleAnswers, tokens, tokenClaims) {
        const eventAttendees = attendeeEvents.filter(ae => ae.eventId === event.id);
        const attendeeCount = eventAttendees.length;

        const eventPuzzleAnswers = puzzleAnswers.filter(answer => {
            const attendee = eventAttendees.find(ae => ae.attendeeId === answer.attendeeId);
            return attendee !== undefined;
        });

        const totalPuzzles = eventPuzzleAnswers.length;
        const completedPuzzles = eventPuzzleAnswers.filter(answer => answer.isCorrect).length;
        const puzzleCompletionRate = totalPuzzles > 0 ? (completedPuzzles / totalPuzzles) * 100 : 0;

        const eventTokenClaims = tokenClaims.filter(claim => {
            const attendee = eventAttendees.find(ae => ae.attendeeId === claim.attendeeId);
            return attendee !== undefined;
        });

        const tokenClaimsCount = eventTokenClaims.length;

        const scores = eventPuzzleAnswers
            .filter(answer => answer.isCorrect)
            .map(answer => {
                const puzzle = tokens.find(token => token.id === answer.puzzleId);
                return puzzle ? puzzle.value : 0;
            });

        const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

        return new EventAnalytics({
            eventId: event.id,
            eventName: event.name,
            attendeeCount,
            puzzleCompletionRate,
            averageScore,
            totalPuzzles,
            completedPuzzles,
            tokenClaimsCount
        });
    }

    toJSON() {
        return {
            eventId: this.eventId,
            eventName: this.eventName,
            attendeeCount: this.attendeeCount,
            puzzleCompletionRate: this.puzzleCompletionRate,
            averageScore: this.averageScore,
            totalPuzzles: this.totalPuzzles,
            completedPuzzles: this.completedPuzzles,
            tokenClaimsCount: this.tokenClaimsCount
        };
    }
}

module.exports = EventAnalytics;
