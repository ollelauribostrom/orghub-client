import { Alert } from 'react-native';

export default function confirm({ heading, text, onPress }) {
  return Alert.alert(
    heading,
    text,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress }
    ]
  )
}