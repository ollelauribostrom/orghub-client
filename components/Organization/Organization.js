import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default ({ login, description, avatar_url, navigation }) => {
  return (
    <TouchableOpacity style={styles.organization} onPress={() => navigation.navigate('Organization', { login })}>
      <View>
        <Image style={styles.organizationImage} source={{uri: avatar_url}} />
      </View>
      <View style={styles.organizationInfo}>  
        <Text style={styles.organizationName}>{login}</Text>
        <Text style={styles.organizationDescription}>{description}</Text>
      </View>
      <Ionicons
        name='ios-arrow-round-forward'
        size={26}
        style={{ color: '#3EABEF' }}
      />
    </TouchableOpacity>
  )
}
