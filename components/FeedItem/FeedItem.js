import React from 'react';
import { Text, View, Image } from 'react-native';
import { dateFormatter } from '../../lib/dateFormatter';
import styles from './styles'

export default ({ title, date, user, description, thumbnailUrl }) => {
  return (
    <View style={styles.feedItem}>
      <View style={styles.feedItemHeader}>
        <Image style={styles.feedItemImage} source={{uri: thumbnailUrl}}></Image>
        <View>
          <Text style={styles.feedItemTitle}>{title}</Text>
          <Text style={styles.feedItemDate}>{dateFormatter(date)}</Text>
        </View>  
      </View>  
      <Text style={styles.feedItemDescription}>
        <Text style={styles.feedItemUsername}>{user} </Text>
        <Text>{description}</Text>
      </Text>
    </View>
  )
}