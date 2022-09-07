const express = require('express');
const router = express.Router();
const leaguesCtrl = require('../../controllers/api/leagues');

router.get('/', leaguesCtrl.getAll)


module.exports = router;