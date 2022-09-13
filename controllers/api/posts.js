const fetch = require('node-fetch');
const baseURL = 'https://api.sleeper.app/v1'
const League = require('../../models/league')

const {waitForAll, computePlayers} = require('../helper-functions')


module.exports = {
  create,
  getAll,
  deletePost
}



async function getAll(req, res) {
  const league = await League.findOne({sleeperLeagueId: req.body.leagueId})
  const posts = league.blogsList
  res.json(posts)
}

async function create(req, res) {
  console.log(req.body)
  const league = await League.findOne({sleeperLeagueId: req.body.leagueId})
  league.blogsList.push(req.body.postData)
  league.save()
  res.json(league.blogsList[league.blogsList.length-1])
}


async function deletePost(req, res) {
  const league = await League.findOne({sleeperLeagueId: req.body.leagueId})
  const newPosts = league.blogsList.filter(post => post._id != req.body.postId)
  league.blogsList = newPosts
  league.save()
  res.json(newPosts)
}

