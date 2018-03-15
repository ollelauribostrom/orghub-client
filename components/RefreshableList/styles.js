import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  emptyMessage: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 15,
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  emptyMessageHeader: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  emptyMessageIconContainer: {
    backgroundColor: '#eaeaea',
    width: 40,
    height: 40,
    borderRadius: 8,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: '#3EABEF',
    fontFamily: 'Roboto-Medium'
  },
  message: {
    marginLeft: 10,
    color: '#6A7F8D',
    fontFamily: 'Roboto',
  }
});
