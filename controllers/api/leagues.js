const fetch = require('node-fetch');
const baseURL = 'https://api.sleeper.app/v1'

const {waitForAll, computePlayers} = require('../helper-functions')


module.exports = {
  getUserLeagues,
  getLeague
}




async function getUserLeagues(req, res) {
  const fetchUser = await fetch(`${baseURL}/user/${req.params.sleeperUser}`)
  const userData = await fetchUser.json()
  if (userData.user_id) {
    const user_id = userData.user_id
    const fetchLeagues = await fetch(`https://api.sleeper.app/v1/user/${user_id}/leagues/nfl/2022`)
    const userLeagues = await fetchLeagues.json();
    res.json(userLeagues)
  }
}




async function getLeague(req, res) {
  const leagueDataResults = await fetch(`${baseURL}/league/${req.params.leagueId}`)
  const leagueData = await leagueDataResults.json();
  // res.json(leagueData)

  const regSznLength = leagueData.settings.playoff_week_start - 1

  const resPromises = [
    fetch(`https://api.sleeper.app/v1/players/nfl`)
  ]

  for (let week = 1; week <= regSznLength; week++ ) {
    resPromises.push(
      fetch(`https://api.sleeper.app/projections/nfl/2022/${week}?season_type=regular&position[]=DB&position[]=DEF&position[]=DL&position[]=FLEX&position[]=IDP_FLEX&position[]=K&position[]=LB&position[]=QB&position[]=RB&position[]=REC_FLEX&position[]=SUPER_FLEX&position[]=TE&position[]=WR&position[]=WRRB_FLEX&order_by=ppr`)
    )
  }

  const responses = await waitForAll(...resPromises);

  const resJSONs = [];
  for(const res of responses) {
      if(!res.ok) {
          return {
              status: 500,
              body: "No luck"
          };
      }
      resJSONs.push(res.json());
  }

  const weeklyData = await waitForAll(...resJSONs);

  const playerData = weeklyData.shift();

  const scoringSettings = leagueData.scoring_settings

  const computedPlayers = computePlayers(playerData, weeklyData, scoringSettings);

  res.json(computedPlayers)

}