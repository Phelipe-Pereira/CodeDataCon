class PuzzleAnswer {
    constructor(data) {
        this.id = data.id;
        this.puzzleId = data.puzzle_id;
        this.attendeeId = data.attendee_id;
        this.answer = data.answer;
        this.isCorrect = data.is_correct === 'true' || data.is_correct === true;
        this.submittedAt = data.submitted_at;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.puzzle_id || !data.attendee_id || !data.answer) {
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
            puzzleId: this.puzzleId,
            attendeeId: this.attendeeId,
            answer: this.answer,
            isCorrect: this.isCorrect,
            submittedAt: this.submittedAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = PuzzleAnswer;
