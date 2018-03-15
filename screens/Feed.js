import React, { Component } from 'react';
import { RefreshableList, FeedItem } from '../components';
import { getUserFeed } from '../lib/feed';

export default class Feed extends Component {
  state = {
    refreshing: false,
    feedItems: [],
  };

  async componentWillReceiveProps(prevProps, prevState) {
    const { organizations, token, appError } = this.props.screenProps;
    this.setState({ organizations, token, appError })

    if (organizations) {
      await this.fetchFeedItems();
    }
  }

  onRefresh = async () => {
    await this.fetchFeedItems();
  }

  fetchFeedItems = async () => {
    try {
      if (this.state.organizations && this.state.token && !this.state.appError) {
        this.setState({ refreshing: true })
        const feedItems = await getUserFeed(this.state.organizations, this.state.token);
        this.setState({ feedItems, refreshing: false })
      }
    } catch (err) {
      this.setState({ error: true })
      return this.props.screenProps.onError(err, {
        log: 'Error loading user feed'
      })
    }
  }

  render() {
    let emptyMessage = 'No events yet!';

    if (this.state.appError) {
      emptyMessage = 'Could not load your organizations. Try refreshing!';;
    }

    if (this.state.error) {
      emptyMessage = 'Could not load your feed. Pull to refresh!';
    }

    return (
      <RefreshableList 
        data={this.state.feedItems}
        renderItem={({item}) => <FeedItem {...item} />}
        keyExtractor={item => item.id}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        title='Feed'
        emptyMessage={emptyMessage}
      />
    )
  }
}
