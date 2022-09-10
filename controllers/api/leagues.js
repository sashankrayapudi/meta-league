const fetch = require('node-fetch');
const baseURL = 'https://api.sleeper.app/v1'


module.exports = {
  getUserLeagues,
  getLeague
}

const handleRejection = (p) => {
  return p.catch((error)=>({
      error
  }))
}

const waitForAll = async (...ps) => {
  return Promise.all(ps.map(handleRejection))
}

const username = 'dankShank'


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


// async function show(req, res) {
//   const fetchResults = await fetch(`${baseURL}/league/${req.params.leagueId}`)
//   const leagueData = await fetchResults.json();
//   res.json(leagueData)
// }

const computePlayers = (playerData, weeklyData, scoringSettings) => {
  const computedPlayers = {};

  // create non weekly dependent player info
  for(const id in playerData) {
      const projPlayer = playerData[id];
      const player = {
          // injury_notes: projPlayer.injury_notes,
          fn: projPlayer.first_name,
          ln: projPlayer.last_name,
          pos: projPlayer.position,
      };
      if(projPlayer.team) {
          player.t = projPlayer.team;
          player.wi = {};
      }
      if(projPlayer.team && projPlayer.injury_status) {
          player.is = projPlayer.injury_status;
      }

      computedPlayers[id] = player;
  }

  // add weekly projections
  for(let week = 1; week <= weeklyData.length; week++) {
      for(const player of weeklyData[week - 1]) {
          const id = player.player_id;
          
          // check if the player is active in the NFL
          if(!computedPlayers[id].wi) continue;

          computedPlayers[id].wi[week] = {
              p: calculateProjection(player.stats, scoringSettings),
              o: player.opponent
          }
      }
  }

  computedPlayers["OAK"] = computedPlayers["LV"];
  return computedPlayers;
}

const calculateProjection = (projectedStats, scoreSettings) => {
  let score = 0
  for(const stat in projectedStats) {
      const multiplier = scoreSettings[stat] ? scoreSettings[stat] : 0;
      score += projectedStats[stat] * multiplier;
  }
  return score;
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