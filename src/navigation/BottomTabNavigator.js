import React from 'react'
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import HomeScreen from '../screens/HomeScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import SearchScreen from '../screens/SearchScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen'
import colors from '../colors'
import { Ionicons } from '@expo/vector-icons'
import PostStackNavigator from './PostStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'


const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='md-home' size={30} color={colors.uamkBlue} />
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='md-search' size={30} color={colors.uamkBlue} />
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarVisible: false,
        tabBarIcon: ({tintColor}) => 
          <Ionicons 
            name='ios-add-circle' 
            size={48} 
            color={colors.uamkBlue} />
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='md-notifications' size={30} color={colors.uamkBlue} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='md-person' size={30} color={colors.uamkBlue}  />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.uamkBlue,
      inactiveTintColor: '#B8BBC4',
      showLabel: false,
      style: {
        backgroundColor: colors.primary,
        height: 70
      }
    },
  }
)

export default createAppContainer(AppTabNavigator)