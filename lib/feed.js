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
    const { data } = await axios.get(`${config.baseUrl}/feed?organizations=${query}`, { headers })
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getOrganizationFeed(organization, token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get(`${config.baseUrl}/feed/${organization}`, { headers })
    return data;
  } catch (err) {
    console.log(err)
    return [];
  }
}