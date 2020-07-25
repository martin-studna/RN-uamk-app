import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MenuDrawer from '../components/MenuDrawer';
import { createStackNavigator } from 'react-navigation-stack';
import DescriptionScreen from '../screens/DescriptionScreen'
import DrawerNavigator from './DrawerNavigator';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';



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
    }
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home',
		headerShown: false
	}
);

export default createAppContainer(appStackNavigator);