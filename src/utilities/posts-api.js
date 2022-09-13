import sendRequest from './send-request';
const BASE_URL = '/api/posts';


export function getAll(leagueId) {
  return sendRequest(`${BASE_URL}/get`,'POST',{leagueId});
}

export function add(postData, leagueId) {
  return sendRequest(`${BASE_URL}`,'POST', {postData, leagueId} )
}

export function deletePost(postId, leagueId) {
  return sendRequest(`${BASE_URL}/delete`, 'POST', {postId, leagueId})
}