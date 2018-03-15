import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { IconButton } from '../components';

export default function Login({ onPress, restored }) {
  if (!restored) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OrgHub</Text>
      <Text style={styles.text}>Manage your Github organizations</Text>
      <IconButton
        text='Sign in with GitHub'
        icon='logo-github'
        onPress={onPress}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3EABEF',
  },
  heading: {
    fontSize: 48,
    color: '#fff',
    fontFamily: 'Roboto-Bold'
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    marginTop: 20
  }
});
