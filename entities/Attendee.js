class Attendee {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.name || !data.email) {
            throw new Error('Dados obrigatórios não fornecidos para Attendee');
        }
        return true;
    }

    static fromCSV(csvData) {
        Attendee.validate(csvData);
        return new Attendee(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Attendee;
