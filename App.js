import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Linking } from 'react-native';
import { Font, Constants, WebBrowser } from 'expo';
import { AppNavigation, config } from './config';
import Login from './screens/Login';
import { restore, login, logout } from './lib/auth';

export default class App extends Component {
  state = {
    token: null,
    username: null,
    fontsLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    });

    const { token, username } = await restore();
    this.setState({ fontsLoaded: true, token, username });
  }

  performLogin = async () => {
    Linking.addEventListener('url', this.onLoginRedirect);
    const url = `${config.baseUrl}/login?redirect=${Constants.linkingUri}`;
    let result = await WebBrowser.openBrowserAsync(url);
    Linking.removeEventListener('url', this.onLoginRedirect);
  }

  onLoginRedirect = async event => {
    WebBrowser.dismissBrowser();
    const { error, username, token } = await login(event.url);
    if (error) {
      return Alert.alert('Something went wrong');
    }
    this.setState({ username, token });
  }

  performLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: 'Cancel', style: 'cancel' }
        { text: 'Yes', onPress: () => {
            await logout(this.state.token);
            this.setState({ token: null, username: null })
        }}
      ]
    )
  }

  performUnregistration = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: 'Cancel', style: 'cancel' }
        { text: 'Yes', onPress: () => {
            await unregister(this.state.token);
            this.setState({ token: null, username: null })
        }}
      ]
    )
  }

  render() {
    const { fontsLoaded, token, username } = this.state;
    
    if (!fontsLoaded) {
      return null;
    }

    if (token) {
      return <AppNavigation screenProps={{
        username,
        token,
        logout: this.performLogout,
        unregister: this.performUnregistration
      }} />
    } else {
      return <Login onPress={this.performLogin}/>
    }
  }
}