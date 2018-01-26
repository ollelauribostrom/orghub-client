import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  organization: {
    backgroundColor: 'rgba(62, 171, 239, 0.1)',
    borderRadius: 8,
    padding: 10,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  organizationImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  organizationName: {
    color: '#6A7F8D',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  organizationDescription: {
    color: '#6A7F8D',
    fontFamily: 'Roboto',
    fontSize: 12    
  },
  organizationInfo: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 10
  }
});
