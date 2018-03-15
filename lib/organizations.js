import axios from 'axios';
import { authHeader } from './auth';

export async function getOrganizations(token) {
  const headers = authHeader(token);
  const { data } = await axios.get('https://api.github.com/user/orgs', { headers })
  return data;
}