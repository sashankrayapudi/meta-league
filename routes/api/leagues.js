const express = require('express');
const router = express.Router();
const leaguesCtrl = require('../../controllers/api/leagues');

// GET /api/leagues
router.get('/', leaguesCtrl.getAll)

// GET /api/leagues/:id
router.get('/:leagueId', leaguesCtrl.show)


module.exports = router;