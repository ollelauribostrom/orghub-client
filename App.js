import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { AppNavigation, baseUrl } from './config';
import  { Login } from './screens';
import { restore, login, logout, unregister, clearStore } from './lib/auth';
import { getOrganizations } from './lib/organizations';
import loadFonts from './lib/fonts';
import confirm from './lib/confirm';

export default class App extends Component {
  state = {
    token: null,
    username: null,
    restored: false,
  }

  async componentDidMount() {
    await loadFonts();
    try {
      const { token, username } = await restore();
      this.setState({ restored: true, token, username });
    } catch (err) {
      return this.onError(err, {
        log: 'Error on restore',
        clear: true,
        state: { restored: true }
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.token === null && this.state.token) {
      await this.fetchOrganizations();
    }
  }

  fetchOrganizations = async () => {
    try {
      this.setState({ loading: true })
      const organizations = await getOrganizations(this.state.token);
      this.setState({ loading: false, organizations, appError: false });
    } catch (err) {
      return this.onError(err, {
        log: 'Error fetching user organizations',
        state: { appError: true }
      });
    }
  }

  onLogin = async () => {
    try {
      Linking.addEventListener('url', this.onLoginRedirect);;
      const url = `${baseUrl}/login?redirect=${Constants.linkingUri}`;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      this.onError(err, {
        alert: 'Something went wrong during login',
        log: 'Error on login',
        clear: true,
      });
    } 
  }

  onLoginRedirect = async event => {
    WebBrowser.dismissBrowser();
    Linking.removeEventListener('url', this.onLoginRedirect);
    const { error, username, token } = await login(event);
    if (error) {
      this.onError(error, {
        alert: 'Something went wrong during login',
        log: 'Error on login redirect',
        clear: true,
      })
    }
    this.setState({ username, token });
  }

  onLogout = async () => {
    try {
      confirm({
        header: 'Logout',
        text: 'Are you sure you want to log out?',
        onPress: async () => {
          await logout(this.state.token);
          this.setState({ token: null, username: null })
        }})
    } catch (err) {
      return this.onError(err, {
        log: 'Error on logout',
        clear: true,
        state: { token: null, username: null }
      })
    }
  }

  onUnregistration = async () => {
    try {
      confirm({
        header: 'Delete account',
        text: 'Are you sure you want to delete your account?',
        onPress: async () => {
          await unregister(this.state.token);
          this.setState({ token: null, username: null })
        }})
    } catch (err) {
      return this.onError(err, {
        log: 'Error on unregistration',
        clear: true,
        state: { token: null, username: null }
      })
    }
  }

  onError = async (err, { log = 'Error: ', clear, state, alert }) => {
    console.log(log, err);

    if (clear) {
      await clearStore();
    }
    if (state) {
      this.setState(state)
    }
    if (alert) {
      Alert.alert('Error :(', alert)
    }
  } 

  render() {
    if (this.state.token) {
      const state = this.state;
      return (
        <AppNavigation
          screenProps={{
            ...state,
            onLogout: this.onLogout,
            onUnregistration: this.onUnregistration,
            fetchOrganizations: this.fetchOrganizations,
            onError: this.onError
          }}
        />
      );
    } else {
      return (
        <Login  
          onPress={this.onLogin} 
          restored={this.state.restored}
        />
      )
    }
  }
}