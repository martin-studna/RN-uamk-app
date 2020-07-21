import React from 'react'
import firebaseConfig from './config'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingScreen from './screens/LoadingScreen'
import * as firebase from 'firebase'
import colors from './colors.js'
import DrawerNavigator from './navigation/DrawerNavigator'
import AuthNavigator from './navigation/AuthNavigator'

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: DrawerNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: "Loading"
    }
  )
)