import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'

const Page = ({text}) =>  {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  )
}

export default function Organization({ navigation }) {
  console.log(navigation);
  return (
    <ScrollableTabView
      tabBarBackgroundColor='#F8F8F8'
      tabBarActiveTextColor='#3EABEF'
      tabBarInactiveTextColor='#6A7F8D'
      tabBarUnderlineStyle={{backgroundColor: '#F8F8F8'}}
      tabBarTextStyle={{fontFamily: 'Roboto'}}
    >
      <Page tabLabel='Statistics' text={navigation.state.params.login} />
      <Page tabLabel='Feed' text='Feed' />
      <Page tabLabel='Notifications' text='Notifications' />
    </ScrollableTabView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
