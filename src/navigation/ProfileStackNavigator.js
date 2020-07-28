import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import ProfileScreen from '../screens/ProfileScreen'


const profileStackNavigator = createStackNavigator(
	{
		Profile: {
			screen: ProfileScreen
    },
    ProfileSettings: {
			screen: ProfileSettingsScreen,
			navigationOptions: {
				
			}
		},
	},
	{
		headerMode: 'none',
		initialRouteName: 'Profile',
		headerShown: false
	}
);

export default createAppContainer(profileStackNavigator);