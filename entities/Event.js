class Event {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.startDate = data.start_date;
        this.endDate = data.end_date;
        this.location = data.location;
        this.city = data.city;
        this.state = data.state;
        this.totalAttendees = data.total_attendees;
        this.slug = data.slug;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.name) {
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
            startDate: this.startDate,
            endDate: this.endDate,
            location: this.location,
            city: this.city,
            state: this.state,
            totalAttendees: this.totalAttendees,
            slug: this.slug,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Event;
