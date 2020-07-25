import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from 'firebase'
import { StatusBar } from "expo-status-bar";


const LoginScreen = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    handleLogin = () => {

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => setErrorMessage(error.message))
    }
    
    
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Text style={styles.greeting}>{'Hello again. \n Welcome back.'}</Text>

                <View style={styles.errorMessage}>
                    {
                        errorMessage && 
                    <Text style={styles.error}>
                        {errorMessage}
                    </Text>
                    }
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            onChangeText={email => setEmail(email) }
                            value={email}
                            autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input}
                        secureTextEntry 
                        autoCapitalize="none"
                        onChangeText={password => setPassword(password)}
                        value={password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={{color: '#fff', fontWeight: '500'}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignSelf: 'center', marginTop: 32}}
                    onPress={() => props.navigation.navigate('Register')}
                    >
                    <Text style={{color: '#414959', fontSize: 13}}>
                        New to SocialApp? <Text style={{color: '#E9446A', fontWeight: '500'}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    
    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'  
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#8A8F9E"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoginScreen

