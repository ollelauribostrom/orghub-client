import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  feedItem: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 15,
    marginHorizontal: 20,
  },
  feedItemHeader: {
    flex: 1, flexDirection: 'row', marginBottom: 10
  },
  feedItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8
  },
  feedItemTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: '#3EABEF',
    fontFamily: 'Roboto-Medium'
  },
  feedItemDate: {
    fontSize: 12,
    marginLeft: 10,
    color: '#BEBEBE',
    fontFamily: 'Roboto'
  },
  feedItemDescription: {
    color: '#6A7F8D',
    fontFamily: 'Roboto'
  },
  feedItemUsername: {
    fontFamily: 'Roboto-Medium'
  },
});
