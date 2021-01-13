import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text, Button } from 'react-native'
import * as firebase from 'firebase'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Should be environmental variables in order to hide (Not implemented)
const firebaseConfig = {
	apiKey: "AIzaSyCQ8_8fMZ-Wp_SL7_4yV4kGAUBIQbQwAjI",
	authDomain: "haiku-5f030.firebaseapp.com",
	projectId: "haiku-5f030",
	storageBucket: "haiku-5f030.appspot.com",
	messagingSenderId: "36175715920",
	appId: "1:36175715920:web:eef8a1f494e5c3b5293b55",
	measurementId: "G-T6VNN18VMM"
};

// Check to see if more than 1 firebase app is open (mulitple will cause crash)
if( firebase.apps.length === 0 ){ 
	firebase.initializeApp( firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded:false
		}
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged( (user)=>{
			if(!user){
				this.setState({
					loggedIn:false,
					loaded:true,
				})
			}else {
				this.setState({
					loggedIn:true,
					loaded:true
				})
			}
		} )
	}

	render() {
		const { loggedIn, loaded } = this.state;
		if(!loaded){
			return(
				<View style={{ flex:1, justifyContent:'center'}}>
					<Text>Loading</Text>
				</View>
			)
		}

		if(!loggedIn){
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen name="Landing" component={ LandingScreen } options={{ headerShown:false }}/>	
						<Stack.Screen name="Register" component={ RegisterScreen }/>	
					</Stack.Navigator>
				</NavigationContainer>
				)
		}

		return(
			<View style={{ flex:1, justifyContent:'center'}}>
				<Text>User logged in</Text>
			</View>
		)
	}
}

export default App