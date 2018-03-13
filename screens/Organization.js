import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { getOrganizationFeed } from '../lib/feed';
import { getStats } from '../lib/stats';
import FeedItem from '../components/FeedItem';

const Page = ({text}) =>  {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  )
}

const Feed = ({ feedItems }) => {
  console.log(feedItems);
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
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(stats)}</Text>
    </View>
  )
}

export default class Organization extends Component {
  state = {
    feedItems: undefined,
    stats: undefined,
  }

  async componentWillMount() {
    const organization = this.props.navigation.state.params.login;
    const token = this.props.screenProps.token;
    await this.loadFeed(organization, token);
    await this.loadStats(organization, token);
  }

  loadFeed = async (organization, token) => {
    console.log(organization, token);
    const feedItems = await getOrganizationFeed(organization, token);
    this.setState({ feedItems });
  }

  loadStats = async (organization, token) => {
    const stats = await getStats(organization, token);
    this.setState({ stats });
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
        <Page tabLabel='Notifications' text='Notifications' />
      </ScrollableTabView>
    );
  }
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
  }
});
