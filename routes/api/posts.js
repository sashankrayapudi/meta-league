const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');

// GET /api/posts/:sleeperUser/:leagueId/posts
router.post('/get', postsCtrl.getAll)

// POST /api/posts/:sleeperUser/:leagueId/posts
router.post('/', postsCtrl.create)

router.post('/delete', postsCtrl.deletePost)

module.exports = router;