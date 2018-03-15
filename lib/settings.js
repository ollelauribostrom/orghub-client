import axios from 'axios';
import { baseUrl } from '../config';
import { authHeader } from './auth';

export async function getSettings(organization, token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get(`${baseUrl}/notifications/${organization}`, { headers })
    data.off = false;
    return data;
  } catch (err) {
    return { off: true }
  }
}

export async function enableNotifications(organization, token) {
  const headers = authHeader(token);
  return axios.post(`${baseUrl}/notifications/${organization}`, {}, { headers })
}

export async function disableNotifications(organization, token) {
  const headers = authHeader(token);
  return axios.delete(`${baseUrl}/notifications/${organization}`, { headers })
}

export async function updateSettings(settings, organization, token) {
  const headers = authHeader(token);
  return axios.put(`${baseUrl}/notifications/${organization}`, {...settings}, { headers })
}