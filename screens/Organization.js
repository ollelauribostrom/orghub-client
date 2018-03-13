import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Switch, TextInput } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { getOrganizationFeed } from '../lib/feed';
import { getStats } from '../lib/stats';
import FeedItem from '../components/FeedItem';
import { Octicons } from '@expo/vector-icons';
import { getNotificationSettings, enableNotifications, disableNotifications, updateNotifications } from '../lib/notifications';

const Notifications = ({ settings, toggleNotifications, changePhone }) =>  {
  return (
    <View style={styles.settingsContainer}>
      <View style={styles.settingField}>
        <Text>Notifications:</Text>
        <Switch value={!settings.off} onValueChange={toggleNotifications}/>
      </View>
      {
        settings.off ? null : ( 
        <View style={styles.settingField}>
          <Text>SMS:</Text>
          <TextInput value={settings.phoneNumber} onSubmitEditing={changePhone}/>
        </View>)
      }
    </View>
  )
}

const Feed = ({ feedItems }) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={feedItems}
        renderItem={({item}) => <FeedItem {...item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={!feedItems}
            colors = {['#3EABEF']}
            tintColor = '#3EABEF'
          />
        }
      />
    </View>
  )
}

const Stats = ({ stats }) => {
  if (!stats) {
    return null
  }

  if (stats.error) {
    return (<Text>{stats.error}</Text>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}><Octicons name='repo-forked'/> Forks: {stats.forks}</Text>
        <Text style={styles.statsText}><Octicons name='star'/> Stars: {stats.stars}</Text>
        <Text style={styles.statsText}><Octicons name='issue-opened'/> Open Issues: {stats.issues}</Text>
        <Text style={styles.statsText}><Octicons name='file-code'/> Languages: {stats.languages.join(', ')}</Text>
      </View>
    </View>
  )
}

export default class Organization extends Component {
  state = {
    feedItems: undefined,
    stats: undefined,
    settings: { off: true }
  }

  async componentWillMount() {
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    await this.loadFeed(organization, token);
    await this.loadStats(organization, token);
    await this.loadNotificationSettings(organization, token);
  }

  loadNotificationSettings = async (organization, token) => {
    const settings = await getNotificationSettings(organization, token);
    this.setState({ settings })
  }

  loadFeed = async (organization, token) => {
    const feedItems = await getOrganizationFeed(organization, token);
    this.setState({ feedItems });
  }

  loadStats = async (organization, token) => {
    const stats = await getStats(organization, token);
    this.setState({ stats });
  }

  toggleNotifications = async () => {
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    if (this.state.settings.off) {
      this.setState({ settings: { off: false }})
      await enableNotifications(organization, token);
      await this.loadNotificationSettings(organization, token);
    } else {
      this.setState({ settings: { off: true }})
      await disableNotifications(organization, token);
    }
  }

  changePhone = async phoneNumber => {
    this.setState({ settings: Object.assign(this.state.settings, { phoneNumber })})
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    await updateNotifications(this.state.settings, organization, token);
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
        <Feed tabLabel='Feed' feedItems={this.state.feedItems} />
        <Stats tabLabel='Statistics' stats={this.state.stats} />
        <Notifications 
          tabLabel='Notifications' 
          settings={this.state.settings}
          toggleNotifications={this.toggleNotifications}
          changePhone={this.changePhone}
        />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statsContainer: {
    padding: 20
  },
  statsText: {
    fontSize: 16,
    marginBottom: 10
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  settingField: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20
  }
});
