import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const CustomRefreshControl = ({refreshing, onRefresh}) => (
  <RefreshControl
    refreshing={refreshing || false}
    onRefresh={onRefresh}
    colors = {['#3EABEF']}
    tintColor = '#3EABEF'
  />
);

const HeaderComponent = ({title}) => title ? (
  <Text style={styles.heading}>{title}</Text>
) : null;

const EmptyMessage = ({message}) => (
  <View style={styles.emptyMessage}>
    <View style={styles.emptyMessageHeader}>
      <View style={styles.emptyMessageIconContainer}>
        <Entypo name='emoji-sad' size={26}/>
      </View>
      <View>
        <Text style={styles.title}>None Found</Text>
      </View>  
    </View>  
    <Text style={styles.message}>{message}</Text>
  </View>
)

export default function RefreshableList({
  data,
  renderItem,
  keyExtractor,
  refreshing,
  onRefresh,
  title,
  emptyMessage
}) {
  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={<CustomRefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={<HeaderComponent title={title} />}
        ListEmptyComponent={<EmptyMessage message={emptyMessage} />}
      />
    </View>
  )
}