class Attendee {
    constructor(data) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.ticketSystemId = data.ticket_system_id;
        this.gender = data.gender;
        this.city = data.city;
        this.state = data.state;
        this.companySegment = data.company_segment;
        this.position = data.position;
        this.positionLevel = data.position_level;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id) {
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
            uuid: this.uuid,
            ticketSystemId: this.ticketSystemId,
            gender: this.gender,
            city: this.city,
            state: this.state,
            companySegment: this.companySegment,
            position: this.position,
            positionLevel: this.positionLevel,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Attendee;
