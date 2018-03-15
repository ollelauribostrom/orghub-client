import axios from 'axios';
import { authHeader } from './auth';
import { baseUrl } from '../config';

export function generateOrgQuery(organizations) {
  return organizations
    .map(org => org.login)
    .join(',');
}

export async function getUserFeed(organizations, token) {
  const query = generateOrgQuery(organizations);
  const headers = authHeader(token);
  const { data } = await axios.get(`${baseUrl}/feed?organizations=${query}`, { headers })
  return data;
}

export async function getOrganizationFeed(organization, token) {
  const headers = authHeader(token);
  const { data } = await axios.get(`${baseUrl}/feed/${organization}`, { headers })
  return data;
}