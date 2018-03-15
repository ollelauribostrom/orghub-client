import React from 'react';
import { RefreshableList, FeedItem } from '../../components';
import styles from './styles';

export default function FeedTab ({ feedItems, feedError, loadingFeed, onRefresh }) {
  let emptyMessage = 'No events yet!';

  if (feedError) {
    emptyMessage = 'Could not load the feed. Pull to refresh!';
  }

  return (
    <RefreshableList 
      data={feedItems}
      renderItem={({item}) => <FeedItem {...item} />}
      keyExtractor={item => item.id}
      refreshing={loadingFeed}
      onRefresh={onRefresh}
      emptyMessage={emptyMessage}
    />
  )
}