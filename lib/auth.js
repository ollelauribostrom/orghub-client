import { Constants } from 'expo';
import qs from 'qs';
import { config } from '../config';
import { clearToken, isValidToken, getToken, setToken } from './token';
import { clearUsername, getUsername, setUsername } from './user';

export async function login(event) {
  let query = event.url.replace(Constants.linkingUri, '');
  const { error, username, token } = qs.parse(query);
  if (username && token) {
    await setUsername(username);
    await setToken(token);
  }
  return { error, username, token }
}

export async function restore() {
  const username = await getUsername();
  const token = await getToken();
  const valid = await isValidToken(token);
  return valid ? { token, username } : {};
}

export async function logout(token) {
  await clearUsername();
  await clearToken();
  return fetch(`${config.baseUrl}/logout?token=${token}`);
}

export async function unregister(token) {
  await clearUsername();
  await clearToken();
  return fetch(`${config.baseUrl}/unregister?token=${token}`);
}

export function authHeader(token) {
  return { Authorization: `token ${token}` };
}

