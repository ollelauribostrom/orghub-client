import axios from 'axios';
import { config } from '../config';

export async function setToken(token) {
  return Expo.SecureStore.setItemAsync('auth-token', token);
}

export async function getToken() {
  return Expo.SecureStore.getItemAsync('auth-token');
}

export async function clearToken() {
  return Expo.SecureStore.deleteItemAsync('auth-token');
}

export async function isValidToken(token) {
  try {
    await axios.get(`${config.baseUrl}/status?token=${token}`);
    return true;
  } catch (err) {
    return false;
  }
}