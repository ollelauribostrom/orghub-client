import axios from 'axios';
import { authHeader } from './auth';
import { config } from '../config';

export function generateOrgQuery(organizations) {
  return organizations
    .map(org => org.login)
    .join(',');
}

export async function getUserFeed(organizations, token) {
  try {
    const query = generateOrgQuery(organizations);
    const headers = authHeader(token);
    const { data } = await axios.get(`${config.feedUrl}?organizations=${query}`, { headers })
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getOrganizationFeed(organinization, token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get(`${config.feedUrl}/${organinization}`, { headers })
    return data;
  } catch (err) {
    console.log(err)
    return [];
  }
}