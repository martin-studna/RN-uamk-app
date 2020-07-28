import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MenuDrawer from '../components/MenuDrawer';
import BottomTabNavigator from './BottomTabNavigator';
import AboutScreen from '../screens/AboutScreen'
import HelpScreen from '../screens/HelpScreen'
import CardActivationScreen from '../screens/CardActivationScreen'
import SettingsScreen from '../screens/SettingsScreen'
import BlueCodeScreen from '../screens/BlueCodeScreen'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.65,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator = createDrawerNavigator(
	{
		Home: {
			screen: BottomTabNavigator
		},
		Settings: {
			screen: SettingsScreen
		},
		About: { 
			screen: AboutScreen
		},
		BlueCode: {
			screen: BlueCodeScreen
		},
		CardActivation: {
			screen: CardActivationScreen
		},
		Help: {
			screen: HelpScreen
		}
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);