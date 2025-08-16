class Puzzle {
    constructor(data) {
        this.id = data.id;
        this.almostList = data.almost_list;
        this.answer = data.answer;
        this.publicId = data.public_id;
        this.rewardCode = data.reward_code;
        this.isUnlocked = data.is_unlocked === 'true';
        this.unlockAt = data.unlock_at;
        this.hint = data.hint;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id) {
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
            almostList: this.almostList,
            answer: this.answer,
            publicId: this.publicId,
            rewardCode: this.rewardCode,
            isUnlocked: this.isUnlocked,
            unlockAt: this.unlockAt,
            hint: this.hint,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Puzzle;
