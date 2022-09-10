import sendRequest from './send-request';
const BASE_URL = '/api/leagues';


export function getUserLeagues(sleeperUser) {
  return sendRequest(`${BASE_URL}/${sleeperUser}`);
}


export function getLeague(sleeperUser, id) {
  return sendRequest(`${BASE_URL}/${sleeperUser}/${id}`)
}