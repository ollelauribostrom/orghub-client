import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import IconButton from '../components/IconButton/';

export default function Login({ username, onPress, restoring }) {
  const buttonText = restoring ? 'Sign in with GitHub' : 'Signing in';
  const iconType = restoring ? 'spinner' : 'logo-github';
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OrgHub</Text>
      <Text style={styles.text}>Manage your Github organizations</Text>
      <IconButton
        text={buttonText}
        icon={iconType}
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
