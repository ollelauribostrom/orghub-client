import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Switch, TextInput } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { FeedTab, StatsTab, SettingsTab } from '../components';
import { getOrganizationFeed } from '../lib/feed';
import { getStats } from '../lib/stats';
import { getSettings, enableNotifications, disableNotifications, updateSettings } from '../lib/settings';

export default class Organization extends Component {
  state = {
    feedItems: undefined,
    stats: undefined,
    settings: { off: true }
  }

  async componentWillMount() {
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    this.setState({ organization, token });
    await this.fetchOrgFeed();
    await this.fetchStats();
    await this.fetchSettings();
  }

  componentWillReceiveProps(nextProps) {
    const organization = nextProps.navigation.state.params.login;
    const token = nextProps.screenProps.token;
    this.setState({ organization, token });
  }

  fetchOrgFeed = async () => {
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    try {
      this.setState({ loadingFeed: true })
      const feedItems = await getOrganizationFeed(organization, token);
      this.setState({ feedItems, feedError: false, loadingFeed: false });
    } catch (err) {
      this.setState({ feedError: true, loadingFeed: false })
      return this.props.screenProps.onError(err, {
        log: 'Error loading organization feed'
      })
    }
  }

  fetchStats = async () => {
    this.setState({ loadingStats: true })
    const stats = await getStats(this.state.organization, this.state.token);
    this.setState({ stats, statsError: false, loadingStats: false });
  }

  fetchSettings = async () => {
    this.setState({ loadingSettings: true })
    const settings = await getSettings(this.state.organization, this.state.token);
    this.setState({ settings, loadingSettings: false })
  }

  onToggle = async () => {
    if (this.state.loadingSettings) {
      return;
    }
    this.setState({ loadingSettings: true })

    try {
      const settings = Object.assign(this.state.settings, { off: !this.state.settings.off });
      if (this.state.settings.off) {
        await enableNotifications(this.state.organization, this.state.token);
        this.setState({ settings, loadingSettings: false })
      } else {
        await disableNotifications(this.state.organization, this.state.token);
        this.setState({ settings, loadingSettings: false })
      }
    } catch (err) {
      this.setState({ loadingSettings: false })
      return this.props.screenProps.onError(err, {
        log: `Error turning notifications ${this.state.settings.off ? 'off' : 'on'}`
      })
    }  
  }

  onInput = phoneNumber  => {
    if (this.state.loadingSettings) {
      return;
    }

    const settings = Object.assign(this.state.settings, { phoneNumber });
    this.setState({ settings })
  }

  onSubmit = async ev => {
    this.setState({ loadingSettings: true })
    try {
      await updateSettings(this.state.settings, this.state.organization, this.state.token);
      this.setState({ loadingSettings: false })
    } catch (err) {
      this.fetchSettings();
      this.setState({ loadingSettings: false })
      return this.props.screenProps.onError(err, {
        log: 'Error updating settings'
      })
    }
  }

  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor='#F8F8F8'
        tabBarActiveTextColor='#3EABEF'
        tabBarInactiveTextColor='#6A7F8D'
        tabBarUnderlineStyle={{backgroundColor: '#F8F8F8'}}
        tabBarTextStyle={{fontFamily: 'Roboto'}}
      >
        <FeedTab
          tabLabel='Feed'
          feedItems={this.state.feedItems}
          feedError={this.state.feedError}
          loadingFeed={this.state.loadingFeed}
          onRefresh={this.fetchOrgFeed}
        />
        <StatsTab
          tabLabel='Statistics'
          stats={this.state.stats}
          loadingStats={this.state.loadingStats}
        />
        <SettingsTab 
          tabLabel='Settings' 
          settings={this.state.settings}
          onToggle={this.onToggle}
          onInput={this.onInput}
          onSubmit={this.onSubmit}
          loadingSettings={this.state.loadingSettings}
        />
      </ScrollableTabView>
    );
  }
}
