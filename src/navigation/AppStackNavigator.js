import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MenuDrawer from '../components/MenuDrawer';
import { createStackNavigator } from 'react-navigation-stack';
import DescriptionScreen from '../screens/DescriptionScreen'
import DrawerNavigator from './DrawerNavigator';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import MenuScreen from '../screens/MenuScreen';
import MapScreen from '../screens/MapScreen';
import DangerScreen from '../screens/DangerScreen'
import TrafficJamScreen from '../screens/TrafficJamScreen'
import TrafficClosureScreen from '../screens/TrafficClosureScreen'



const appStackNavigator = createStackNavigator(
	{
		Home: {
			screen: DrawerNavigator
    },
    ProfileSettings: {
      screen: ProfileSettingsScreen
    },
    Description: {
      screen: DescriptionScreen
		},
		Menu: {
			screen: MenuScreen
		},
		Map: {
			screen: MapScreen
		},
		TrafficClosure: {
			screen: TrafficClosureScreen
		},
		TrafficJam: {
			screen: TrafficJamScreen
		},
		Danger: {
			screen: DangerScreen
		}
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home',
		headerShown: false
	}
);

export default createAppContainer(appStackNavigator);