import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default ({ name, description, thumbnailUrl, navigation }) => {
  return (
    <TouchableOpacity style={styles.organization} onPress={() => navigation.navigate('Organization', { name })}>
      <View>
        <Image style={styles.organizationImage} source={{uri: thumbnailUrl}} />
      </View>
      <View style={styles.organizationInfo}>  
        <Text style={styles.organizationName}>{name}</Text>
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
