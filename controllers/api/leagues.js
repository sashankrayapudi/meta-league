const fetch = require('node-fetch');


module.exports = {
  getAll
}

const username = 'dankShank'


async function getAll(req, res) {
  const fetchResults = await fetch(`https://api.sleeper.app/v1/user/734551042989084672/leagues/nfl/2022`)
  const userLeagues = await fetchResults.json();
  console.log(userLeagues)
  res.json(userLeagues)
}

