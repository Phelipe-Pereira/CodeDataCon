const DataProcessor = require('../services/DataProcessor');
const dataProcessor = new DataProcessor();

module.exports = {
    async getTopPerformers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const performers = await dataProcessor.getTopPerformers(limit);
            res.json(performers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getTopTokens(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const tokens = await dataProcessor.getTokens();
            const claims = await dataProcessor.getTokenClaims();
            
            if (!Array.isArray(claims)) {
                return res.status(500).json({ error: 'Dados de claims inválidos' });
            }
            
            const tokenStats = {};
            claims.forEach(claim => {
                if (!tokenStats[claim.tokenId]) {
                    tokenStats[claim.tokenId] = 0;
                }
                tokenStats[claim.tokenId]++;
            });
            
            const topTokens = Object.entries(tokenStats)
                .map(([tokenId, count]) => {
                    const token = tokens.find(t => t.id === tokenId);
                    return {
                        tokenId,
                        code: token?.code,
                        description: token?.description,
                        value: token?.value,
                        claimCount: count
                    };
                })
                .sort((a, b) => b.claimCount - a.claimCount)
                .slice(0, limit);
            
            res.json(topTokens);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getTopTokenClaimers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const claims = await dataProcessor.getTokenClaims();
            const attendees = await dataProcessor.getAttendees();
            
            if (!Array.isArray(claims)) {
                return res.status(500).json({ error: 'Dados de claims inválidos' });
            }
            
            const claimerStats = {};
            claims.forEach(claim => {
                if (!claimerStats[claim.attendeeId]) {
                    claimerStats[claim.attendeeId] = 0;
                }
                claimerStats[claim.attendeeId]++;
            });
            
            const topClaimers = Object.entries(claimerStats)
                .map(([attendeeId, count]) => {
                    const attendee = attendees.find(a => a.id === attendeeId);
                    return {
                        attendeeId,
                        name: attendee ? `Participante ${attendee.id}` : 'Unknown',
                        city: attendee?.city,
                        claimCount: count
                    };
                })
                .sort((a, b) => b.claimCount - a.claimCount)
                .slice(0, limit);
            
            res.json(topClaimers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getTopEventAttendees(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const attendeeEvents = await dataProcessor.getAttendeeEvents();
            const attendees = await dataProcessor.getAttendees();
            
            if (!Array.isArray(attendeeEvents)) {
                return res.status(500).json({ error: 'Dados de attendee events inválidos' });
            }
            
            const attendeeStats = {};
            attendeeEvents.forEach(ae => {
                if (!attendeeStats[ae.attendeeId]) {
                    attendeeStats[ae.attendeeId] = 0;
                }
                attendeeStats[ae.attendeeId]++;
            });
            
            const topAttendees = Object.entries(attendeeStats)
                .map(([attendeeId, count]) => {
                    const attendee = attendees.find(a => a.id === attendeeId);
                    return {
                        attendeeId,
                        name: attendee ? `Participante ${attendee.id}` : 'Unknown',
                        city: attendee?.city,
                        eventCount: count
                    };
                })
                .sort((a, b) => b.eventCount - a.eventCount)
                .slice(0, limit);
            
            res.json(topAttendees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getTotalClaims(req, res) {
        try {
            const claims = await dataProcessor.getTokenClaims();
            res.json({ totalClaims: claims.length });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
