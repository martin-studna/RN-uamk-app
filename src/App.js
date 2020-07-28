import React from 'react'
import firebaseConfig from './config'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingScreen from './screens/LoadingScreen'
import * as firebase from 'firebase'
import colors from './colors.js'
import DrawerNavigator from './navigation/DrawerNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AppStackNavigator from './navigation/AppStackNavigator'

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStackNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: "Loading"
    }
  )
)