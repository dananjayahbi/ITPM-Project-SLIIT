const router = require('express').Router();
const { aiBotController } = require('../controllers/AIBotController');

// Create a new instance of the AIBotController
router.post('/chat', aiBotController);

module.exports = router;