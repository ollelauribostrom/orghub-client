import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    borderRightWidth: 1,
    borderRightColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 18
  }
});
