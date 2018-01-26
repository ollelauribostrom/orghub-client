import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { mockFeed, mockFetch } from '../mock';
import FeedItem from '../components/FeedItem';

export default class Feed extends Component {
  state = {
    refreshing: false,
    feedItems: mockFeed
  };

  onRefresh = async () => {
    console.log('fetch new feed');
    this.setState({ refreshing: true })
    await mockFetch();
    this.setState({ refreshing: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.feedItems}
          renderItem={({item}) => <FeedItem {...item}/>}
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
