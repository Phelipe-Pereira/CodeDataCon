class Token {
    constructor(data) {
        this.id = data.id;
        this.code = data.code;
        this.description = data.description;
        this.value = parseInt(data.value) || 0;
        this.decreaseValue = parseInt(data.decrease_value) || 0;
        this.minimumValue = parseInt(data.minimum_value) || 0;
        this.totalClaims = data.total_claims;
        this.remainingClaims = data.remaining_claims;
        this.createdBy = data.created_by;
        this.expireAt = data.expire_at;
        this.releaseDate = data.release_date;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id) {
            throw new Error('Dados obrigatórios não fornecidos para Token');
        }
        return true;
    }

    static fromCSV(csvData) {
        Token.validate(csvData);
        return new Token(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            description: this.description,
            value: this.value,
            decreaseValue: this.decreaseValue,
            minimumValue: this.minimumValue,
            totalClaims: this.totalClaims,
            remainingClaims: this.remainingClaims,
            createdBy: this.createdBy,
            expireAt: this.expireAt,
            releaseDate: this.releaseDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Token;
