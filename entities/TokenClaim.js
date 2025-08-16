class TokenClaim {
    constructor(data) {
        this.id = data.id;
        this.tokenId = data.token_id;
        this.attendeeId = data.attendee_id;
        this.claimedAt = data.claimed_at;
        this.status = data.status;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static validate(data) {
        if (!data.id || !data.token_id || !data.attendee_id) {
            throw new Error('Dados obrigatórios não fornecidos para TokenClaim');
        }
        return true;
    }

    static fromCSV(csvData) {
        TokenClaim.validate(csvData);
        return new TokenClaim(csvData);
    }

    toJSON() {
        return {
            id: this.id,
            tokenId: this.tokenId,
            attendeeId: this.attendeeId,
            claimedAt: this.claimedAt,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = TokenClaim;
