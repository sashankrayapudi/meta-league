const fetch = require('node-fetch');
const baseURL = 'https://api.sleeper.app/v1'


module.exports = {
  getAll,
  show
}

const username = 'dankShank'


async function getAll(req, res) {
  const fetchResults = await fetch(`https://api.sleeper.app/v1/user/734551042989084672/leagues/nfl/2022`)
  const userLeagues = await fetchResults.json();
  console.log(userLeagues)
  res.json(userLeagues)
}


// async function show(req, res) {
//   const fetchResults = await fetch(`${baseURL}/league/${req.params.leagueId}`)
//   const leagueData = await fetchResults.json();
//   res.json(leagueData)
// }



const handleRejection = (p) => {
  return p.catch((error)=>({
      error
  }))
}

const waitForAll = async (...ps) => {
  return Promise.all(ps.map(handleRejection))
}


async function show(req, res) {
  const leagueDataResults = await fetch(`${baseURL}/league/${req.params.leagueId}`)
  const leagueData = await leagueDataResults.json();
  // res.json(leagueData)

  const regSznLength = leagueData.settings.playoff_week_start - 1

  const resPromises = []
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
  const scoringSettings = leagueData.scoringSettings
  res.json(weeklyData[0][0].stats)



}