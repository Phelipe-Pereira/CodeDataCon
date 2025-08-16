class Event {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.date = data.date;
        this.description = data.description;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.name || !data.date) {
            throw new Error('Dados obrigatórios não fornecidos para Event');
        }
        return true;
    }

    static fromCSV(csvData) {
        Event.validate(csvData);
        return new Event(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Event;
