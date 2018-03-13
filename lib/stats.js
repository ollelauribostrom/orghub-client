import axios from 'axios';
import { authHeader } from './auth';
import { config } from '../config';

export async function getStats(organization, token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get(`${config.statsUrl}/${organization}`, { headers })
    return data;
  } catch (err) {
    return {};
  }
}