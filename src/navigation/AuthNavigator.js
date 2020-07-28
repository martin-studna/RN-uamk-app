import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'



const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  
},
{
  headerMode: 'none',
})


export default createAppContainer(AuthStack)