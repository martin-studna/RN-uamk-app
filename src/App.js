import React from 'react'
import { YellowBox } from 'react-native'
import firebaseConfig from './config'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingScreen from './screens/LoadingScreen'
import * as firebase from 'firebase'
import colors from './colors.js'
import DrawerNavigator from './navigation/DrawerNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AppStackNavigator from './navigation/AppStackNavigator'


console.disableYellowBox = true;

YellowBox.ignoreWarnings(['Setting a timer']);
 

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