const express = require('express');
const router = express.Router();
const leaguesCtrl = require('../../controllers/api/leagues');

// GET /api/leagues
router.get('/:sleeperUser', leaguesCtrl.getUserLeagues)

// GET /api/leagues/:sleeperUser/:id
router.get('/:sleeperUser/:leagueId', leaguesCtrl.getLeague)


module.exports = router;