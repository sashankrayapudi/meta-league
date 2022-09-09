import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as leaguesAPI from '../utilities/leagues-api'


export default function LeaguePage() {
  const [league, setLeague] = useState(null);
  let { leagueId } = useParams();

  useEffect(function() {
    async function getLeague() {
      const leagueData = await leaguesAPI.getById(leagueId);
      // console.log(leagueData)
      setLeague(leagueData)
    }
    getLeague()
  }, [leagueId])

  return (
    <div>
      <h1>{JSON.stringify(league)}</h1>
    </div>
  )

}