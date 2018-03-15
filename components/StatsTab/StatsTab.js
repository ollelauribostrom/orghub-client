import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Octicons, Entypo } from '@expo/vector-icons';
import styles from './styles';

export default function StatsTab ({ stats, loadingStats }) {
  if (!stats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (stats.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Entypo name='emoji-sad' size={26}/> {stats.error}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Octicons name='repo-forked'/> Forks: {stats.forks}
      </Text>
      <Text style={styles.text}>
        <Octicons name='star'/> Stars: {stats.stars}
      </Text>
      <Text style={styles.text}>
        <Octicons name='issue-opened'/> Open Issues: {stats.issues}
      </Text>
      <Text style={styles.text}>
        <Octicons name='file-code'/> Languages: {stats.languages.join(', ')}
      </Text>
    </View>
  )
}