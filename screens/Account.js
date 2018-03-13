import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import IconButton from '../components/IconButton';

export default function Account({ screenProps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account</Text>
      <Text style={styles.text}>Logged in as: 
        <Text style={styles.username}> {screenProps.username}</Text>
      </Text>
      <IconButton
        text='Logout'
        fillColor='#EFC43E'
        icon='ios-log-out'
        onPress={screenProps.logout}
        style={styles.button}
      />
      <IconButton
        text='Delete account'
        fillColor='#EF793E'
        icon='ios-close-circle-outline'
        onPress={screenProps.unregister}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    color: '#6A6A6A',
    fontFamily: 'Roboto-Thin'
  },
  text: {
    color: '#6A7F8D',
    fontFamily: 'Roboto',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20
  },
  username: {
    fontFamily: 'Roboto-Medium'
  },
  button: {
    marginTop: 20,
  }
});
