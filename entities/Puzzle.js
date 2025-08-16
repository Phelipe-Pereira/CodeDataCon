class Puzzle {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.difficulty = data.difficulty;
        this.points = data.points;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.title || !data.description) {
            throw new Error('Dados obrigatórios não fornecidos para Puzzle');
        }
        return true;
    }

    static fromCSV(csvData) {
        Puzzle.validate(csvData);
        return new Puzzle(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            difficulty: this.difficulty,
            points: this.points,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Puzzle;
