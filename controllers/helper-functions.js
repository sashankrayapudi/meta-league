




const handleRejection = (p) => {
  return p.catch((error)=>({
      error
  }))
}

exports.waitForAll = async (...ps) => {
  return Promise.all(ps.map(handleRejection))
}



exports.computePlayers = (playerData, weeklyData, scoringSettings) => {
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
