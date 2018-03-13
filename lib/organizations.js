import axios from 'axios';
import { authHeader } from './auth';

export async function getOrganizations(token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get('https://api.github.com/user/orgs', { headers })
    return data;
  } catch (err) {
    return [];
  }
}