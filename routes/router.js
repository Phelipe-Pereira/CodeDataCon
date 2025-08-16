
const express = require('express');
const AttendeeController = require('../controllers/AttendeeController');
const EventController = require('../controllers/EventController');
const AttendeeEventController = require('../controllers/AttendeeEventController');
const PuzzleController = require('../controllers/PuzzleController');
const PuzzleAnswerController = require('../controllers/PuzzleAnswerController');
const TokenController = require('../controllers/TokenController');
const TokenClaimController = require('../controllers/TokenClaimController');
const DashboardStatsController = require('../controllers/DashboardStatsController');
const EventAnalyticsController = require('../controllers/EventAnalyticsController');
const AnalyticsController = require('../controllers/AnalyticsController');
const CacheController = require('../controllers/CacheController');

const router = express.Router();

// Dashboard
router.get('/dashboard/stats', DashboardStatsController.getStats);
router.get('/dashboard/top-performers', AnalyticsController.getTopPerformers);

// Attendees
router.get('/attendees', AttendeeController.getAll);
router.get('/attendees/:id', AttendeeController.getById);

// Events
router.get('/events', EventController.getAll);
router.get('/events/:id', EventController.getById);
router.get('/events/:id/attendees', EventController.getAttendees);
router.get('/events/:id/analytics', EventAnalyticsController.getAnalytics);

// Puzzles
router.get('/puzzles', PuzzleController.getAll);
router.get('/puzzles/:id', PuzzleController.getById);
router.get('/puzzle-answers', PuzzleAnswerController.getAll);

// Tokens
router.get('/tokens', TokenController.getAll);
router.get('/tokens/:id', TokenController.getById);
router.get('/token-claims', TokenClaimController.getAll);
router.get('/dashboard-stats', DashboardStatsController.getStats);
router.get('/event-analytics/:eventId', EventAnalyticsController.getAnalytics);

// Analytics
router.get('/analytics/top-tokens', AnalyticsController.getTopTokens);
router.get('/analytics/top-token-claimers', AnalyticsController.getTopTokenClaimers);
router.get('/analytics/top-event-attendees', AnalyticsController.getTopEventAttendees);
router.get('/analytics/total-claims', AnalyticsController.getTotalClaims);

// Cache Management
router.post('/cache/clear', CacheController.clearCache);
router.post('/cache/refresh', CacheController.forceRefresh);
router.get('/cache/info', CacheController.getCacheInfo);

module.exports = router;
