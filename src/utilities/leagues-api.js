import sendRequest from './send-request';
const BASE_URL = '/api/leagues';


export function getAll() {
  return sendRequest(BASE_URL);
}