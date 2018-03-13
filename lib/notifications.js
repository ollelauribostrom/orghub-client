import axios from 'axios';
import { config } from '../config';
import { authHeader } from './auth';

export async function getNotificationSettings(organization, token) {
  try {
    const headers = authHeader(token);
    const { data } = await axios.get(`${config.baseUrl}/notifications/${organization}`, { headers })
    data.off = false;
    return data;
  } catch (err) {
    return { off: true }
  }
}

export async function enableNotifications(organization, token) {
  console.log(organization, token);
  try {
    const headers = authHeader(token);
    await axios.post(`${config.baseUrl}/notifications/${organization}`, { headers })
  } catch (err) {
    console.log(err);
  }
}

export async function disableNotifications(organization, token) {
  try {
    const headers = authHeader(token);
    await axios.delete(`${config.baseUrl}/notifications/${organization}`, { headers })
  } catch (err) {
    console.log(err);
  }
}

export async function updateNotifications(settings, organization, token) {
  try {
    const headers = authHeader(token);
    await axios.put(`${config.baseUrl}/notifications/${organization}`, {...settings}, { headers })
  } catch (err) {
    console.log(err);
  }
}