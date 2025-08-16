class Token {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.value = parseInt(data.value) || 0;
        this.description = data.description;
        this.type = data.type;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.name) {
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
            name: this.name,
            value: this.value,
            description: this.description,
            type: this.type,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Token;
