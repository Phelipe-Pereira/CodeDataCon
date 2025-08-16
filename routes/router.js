
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

const router = express.Router();

router.get('/attendees', AttendeeController.getAll);
router.get('/events', EventController.getAll);
router.get('/attendee-events', AttendeeEventController.getAll);
router.get('/puzzles', PuzzleController.getAll);
router.get('/puzzle-answers', PuzzleAnswerController.getAll);
router.get('/tokens', TokenController.getAll);
router.get('/token-claims', TokenClaimController.getAll);
router.get('/dashboard-stats', DashboardStatsController.getStats);
router.get('/event-analytics/:eventId', EventAnalyticsController.getAnalytics);

module.exports = router;
