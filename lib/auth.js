import qs from 'qs';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';
import { baseUrl } from '../config';

export async function login(event) {
  const query = event.url.replace(Constants.linkingUri, '');
  const { error, username, token } = qs.parse(query);
  try  {
    if (username && token) {
      await SecureStore.setItemAsync('username', username);
      await SecureStore.setItemAsync('auth-token', token);
    } 
    return { error, username, token };
  } catch (error) {
    return { error };
  }
}

export async function restore() {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('auth-token');
  if (token) {
    await axios.get(`${baseUrl}/status?token=${token}`);
  }
  return { token, username }
}

export async function logout(token) {
  await clearStore();
  return axios.get(`${baseUrl}/logout?token=${token}`);
}

export async function unregister(token) {
  await clearStore();
  return axios.get(`${baseUrl}/unregister?token=${token}`);
}

export function authHeader(token) {
  return { Authorization: `token ${token}` };
}

export async function clearStore() {
  await SecureStore.deleteItemAsync('username'),
  await SecureStore.deleteItemAsync('auth-token')
}
