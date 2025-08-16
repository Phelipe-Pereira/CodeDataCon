class AttendeeEvent {
    constructor(data) {
        this.attendeeId = data.attendee_id;
        this.eventId = data.event_id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.attendee_id || !data.event_id) {
            throw new Error('Dados obrigatórios não fornecidos para AttendeeEvent');
        }
        return true;
    }

    static fromCSV(csvData) {
        AttendeeEvent.validate(csvData);
        return new AttendeeEvent(csvData);
    }

    toJSON() {
        return {
            attendeeId: this.attendeeId,
            eventId: this.eventId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = AttendeeEvent;
