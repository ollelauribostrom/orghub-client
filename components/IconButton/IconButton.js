import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function IconButton({ onPress, fillColor, icon, text, style }) {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.button, style, { backgroundColor: fillColor }]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={26}
            style={{ color: '#fff' }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>  
  )
}
