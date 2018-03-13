import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import Organization from '../components/Organization';

export default class Organizations extends Component {
  state = {
    refreshing: false,
  };

  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.screenProps.loadOrganizations();
    this.setState({ refreshing: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.screenProps.organizations}
          renderItem={({item}) => <Organization {...item} navigation={this.props.navigation}/>}
          keyExtractor={organization => organization.login}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              colors = {['#3EABEF']}
              tintColor = '#3EABEF'
            />
          }
          ListHeaderComponent = {
            <Text style={styles.heading}>Organizations</Text>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    color: '#6A6A6A',
    fontFamily: 'Roboto-Thin'
  },
});
