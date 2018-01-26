import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigation } from './config';
import { Font } from 'expo';
import Login from './screens/Login';

export default class App extends Component {
  state = {
    loggedIn: false,
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

    this.setState({ fontsLoaded: true });
  }

  login = () => {
    this.setState({
      loggedIn: true,
      username: 'ollelauribostrom',
    })
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      username: null,
    })
  }

  render() {
    if (this.state.loggedIn) {
      return this.state.fontsLoaded ? <AppNavigation screenProps={{username: this.state.username, logout: this.logout}} /> : null;
    } else {
      return this.state.fontsLoaded ? <Login onPress={this.login}/> : null;
    }
  }
}