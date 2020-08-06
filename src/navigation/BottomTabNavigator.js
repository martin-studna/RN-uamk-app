import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import HomeScreen from '../screens/HomeScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import SearchScreen from '../screens/SearchScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen'
import colors from '../colors'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <MaterialCommunityIcon name={focused ? 'home' : 'home-outline'} size={30} color={tintColor} />
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <Ionicons name='md-search' size={30} color={tintColor} />
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarVisible: false,
        
        tabBarIcon: ({tintColor}) => 
          <Image 
            style={{width: 70, height: 70, marginBottom: 10 }}
            source={require('../assets/button.png')} />
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <MaterialIcon name={ focused ? 'notifications' : 'notifications-none'} size={30} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <MaterialIcon name={ focused ? 'person' : 'person-outline'} size={30} color={tintColor}  />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: colors.uamkBlue,
      showLabel: false,
      style: {
        backgroundColor: colors.primary,
        height: 70
      }
    },
  }
)

export default createAppContainer(AppTabNavigator)