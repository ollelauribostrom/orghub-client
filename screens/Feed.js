import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { getUserFeed } from '../lib/feed';
import FeedItem from '../components/FeedItem';

export default class Feed extends Component {
  state = {
    refreshing: false,
    feedItems: [],
  };

  async fetchFeed() {
    this.setState({ refreshing: true })
    const { organizations, token } = this.props.screenProps;
    const feedItems = await getUserFeed(organizations, token);
    this.setState({ feedItems, refreshing: false })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.screenProps.organizations !== prevProps.screenProps.organizations) {
      await this.fetchFeed();
    }
  }

  onRefresh = async () => {
    await this.fetchFeed();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.feedItems}
          renderItem={({item}) => <FeedItem {...item} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              colors = {['#3EABEF']}
              tintColor = '#3EABEF'
            />
          }
          ListHeaderComponent = {
            <Text style={styles.heading}>Feed</Text>
          }
        />
      </View>
    )
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
