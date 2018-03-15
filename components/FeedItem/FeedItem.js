import React from 'react';
import { Text, View, Image } from 'react-native';
import dateFormatter from '../../lib/dateFormatter';
import styles from './styles';

export default function FeedItem ({ actor, type, created_at, org }) {
  return (
    <View style={styles.feedItem}>
      <View style={styles.feedItemHeader}>
        <Image style={styles.feedItemImage} source={{uri: org.avatar_url}}></Image>
        <View>
          <Text style={styles.feedItemTitle}>{type}</Text>
          <Text style={styles.feedItemDate}>{dateFormatter(created_at)}</Text>
        </View>  
      </View>  
      <Text style={styles.feedItemDescription}>
        <Text style={styles.feedItemUsername}>by {actor.login} </Text>
      </Text>
    </View>
  )
}