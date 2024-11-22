import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignup() {
        navigation.navigate('Sign');
    }

    function handleBack() {
        navigation.navigate('Info');
    }

    async function handleLogin() {
        try {
            const response = await axios.post('http://vamsikeshwarans-macbook-air.local:5001/login', {
                email,
                password,
            });

            if (response.data.status === 'Authenticated') {
                Alert.alert('Success', 'Log In successfull!');
                if (response.data.gender == null) {
                    navigation.navigate('Setup', { name: response.data.name });
                }
                else {
                    navigation.navigate('Home', { name: response.data.name });
                }
            } else {
                Alert.alert('Error', 'Invalid email or password'); // Show error alert
            }
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password')// Show general error alert
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Image source={require('../assets/splash.png')} style={{ width: 200, height: 200, marginTop: -180 }} resizeMode='contain' />
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleBack} />
                <Text style={styles.textStyle}>Log In</Text>
            </View>
            <Text style={styles.welcomeStyle}>Welcome</Text>
            <View style={{ width: 300, height: 200, marginTop: 25 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 14 }}>This is the login page for our app, start your enriching fitness journey from here.</Text>
            </View>
            <View style={{ width: '100%', height: 240, backgroundColor: '#B3A0FF', marginTop: -130, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Email</Text>
                <TextInput
                    style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Password</Text>
                <TextInput
                    style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', marginTop: 30 }}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
    },
    header: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: -30
    },
    textStyle: {
        color: '#E2F163',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
    },
    welcomeStyle: {
        color: 'white',
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 24
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        color: '#E2F163',
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 8
    }
});
