import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Account, Feed, Organizations, Organization } from '../screens';

const header = (title = 'OrgHub', hideBoarder = false) => {
  return {
    headerBackTitle: null,
    headerTintColor: '#3EABEF',
    title,
    headerTitleStyle: {
      color: '#000',
      fontFamily: 'Roboto-Medium'
    },
    headerStyle: {
      borderBottomWidth: hideBoarder ? 0 : 1
    }
  }
}

const organizationsTab = StackNavigator({
  Organizations: {
    screen: Organizations,
    path: '/',
    navigationOptions: ({ navigation }) => (header()),
  },
  Organization: {
    screen: Organization,
    path: '/organization/:login',
    navigationOptions: ({ navigation }) => (header(`${navigation.state.params.login}`, true)),
  }
})

const feedTab = StackNavigator({
  Feed: {
    screen: Feed,
    path: '/',
    navigationOptions: ({ navigation }) => (header()),
  }
})

const accountTab = StackNavigator({
  Account: {
    screen: Account,
    path: '/',
    navigationOptions: ({ navigation }) => (header()),
  }
})

export default TabNavigator(
  {
    FeedTab: {
      screen: feedTab,
      path: '/feed',
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <SimpleLineIcons
            name='energy'
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    OrganizationsTab: {
      screen: organizationsTab,
      path: '/org',
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <SimpleLineIcons
            name='organization'
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    AccountTab: {
      screen: accountTab,
      path: '/acc',
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <SimpleLineIcons
            name='ghost'
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#3EABEF',
      showLabel: false,
    },
  }
)