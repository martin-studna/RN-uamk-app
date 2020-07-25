import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MenuDrawer from '../components/MenuDrawer';
import { createStackNavigator } from 'react-navigation-stack';
import Post2Screen from '../screens/PostScreen'
import DescriptionScreen from '../screens/DescriptionScreen'



const postStackNavigator = createStackNavigator(
	{
		Post: {
			screen: Post2Screen
    },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Post',
		headerShown: false
	}
);

export default createAppContainer(postStackNavigator);