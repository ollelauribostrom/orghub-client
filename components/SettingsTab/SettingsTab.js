import React from 'react';
import { Text, View, Switch, TextInput, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function SettingsTab ({ settings, onToggle, onInput, onSubmit, loadingSettings }) {
  if (loadingSettings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Notifications:</Text>
        <Switch value={!settings.off} onValueChange={onToggle}/>
      </View>
      {
        settings.off ? null : ( 
        <View>
          <Text>SMS:</Text>
          <View style={styles.input}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              value={settings.phoneNumber}
              onSubmitEditing={onSubmit}
              onChangeText={onInput}
            />
          </View>
        </View>)
      }
    </View>
  )
}