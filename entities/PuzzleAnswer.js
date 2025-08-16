class PuzzleAnswer {
    constructor(data) {
        this.id = data.id;
        this.attempts = parseInt(data.attempts) || 0;
        this.almosts = parseInt(data.almosts) || 0;
        this.status = data.status;
        this.doneAt = data.done_at;
        this.attendeeUuid = data.attendee_uuid;
        this.puzzleId = data.puzzle_id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.attendee_uuid || !data.puzzle_id) {
            throw new Error('Dados obrigatórios não fornecidos para PuzzleAnswer');
        }
        return true;
    }

    static fromCSV(csvData) {
        PuzzleAnswer.validate(csvData);
        return new PuzzleAnswer(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            attempts: this.attempts,
            almosts: this.almosts,
            status: this.status,
            doneAt: this.doneAt,
            attendeeUuid: this.attendeeUuid,
            puzzleId: this.puzzleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = PuzzleAnswer;
