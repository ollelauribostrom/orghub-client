import Expo from 'expo';

export async function setUsername(username) {
  return Expo.SecureStore.setItemAsync('username', username);
}

export async function getUsername() {
  return Expo.SecureStore.getItemAsync('username');
} 

export async function clearUsername() {
  return Expo.SecureStore.deleteItemAsync('username');
}