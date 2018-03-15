import React, { Component } from 'react';
import { RefreshableList , Organization } from '../components';

export default function Organizations({ navigation, screenProps }) {
  const { organizations, loading, fetchOrganizations, appError } = screenProps;
  console.log(organizations)
  let emptyMessage = 'You do not have any organizations';

  if (appError) {
    emptyMessage = 'Could not load your organizations. Pull to refresh!';
  }

  return (
    <RefreshableList 
      data={organizations}
      renderItem={({item}) => <Organization {...item} navigation={navigation}/>}
      keyExtractor={organization => organization.login}
      refreshing={loading}
      onRefresh={fetchOrganizations}
      title='Organizations'
      emptyMessage={emptyMessage}
    />
  )
}