import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const SignUp = ({ navigation }) => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [conpass, setconpass] = useState('');
    async function handlesignup() {
        if (pass !== conpass) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://vamsikeshwarans-macbook-air.local:5001/register', {
                name: name,
                email: email,
                password: pass
            });

            if (response.status === 201) {
                Alert.alert('Success', 'User registered successfully!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', 'An error occurred during registration.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            Alert.alert('Error', 'Failed to register. Try again later.');
        }
    }
    function handleback() {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.maincontainer}>
            <Image source={require('../assets/splash.png')} style={{ width: 200, height: 200, marginTop: -70 }} resizeMode='contain' />
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
                <Text style={styles.textstyle}>Create Account</Text>
            </View>
            <Text style={styles.welcomestyle}>Let's Start!</Text>
            <View style={{ width: '100%', height: 410, backgroundColor: '#B3A0FF', justifyContent: 'center' }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Full Name</Text>
                    <TextInput style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }} placeholder="Enter Name" autoCapitalize="none" onChangeText={(text) => { setname(text); }} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Email Address</Text>
                    <TextInput style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }} keyboardType="email-address" placeholder="Enter your email" autoCapitalize="none" onChangeText={(text) => { setemail(text); }} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Password</Text>
                    <TextInput style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }} secureTextEntry={true} placeholder="Enter your password" autoCapitalize="none" onChangeText={(text) => { setpass(text); }} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 50, marginBottom: 10 }}>Confirm Password</Text>
                    <TextInput style={{ backgroundColor: 'white', width: 300, height: 45, marginLeft: 43, borderRadius: 50, marginBottom: 25, padding: 15 }} secureTextEntry={true} placeholder="Enter your password" autoCapitalize="none" onChangeText={(text) => { setconpass(text); }} />
                </View>
            </View>
            <View style={{ marginTop: 15, width: 250 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>By continuing, you agree to <Text style={{ color: '#E2F163' }}>Terms of Use</Text> and <Text style={{ color: '#E2F163' }}>Privacy Policy</Text>.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlesignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', marginTop: 20 }}>Already have an account?</Text>
                <TouchableOpacity onPress={handleback}>
                    <Text style={styles.signuptext}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    maincontainer: {
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
        marginTop: -40
    },
    textstyle: {
        color: '#E2F163',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
    },
    welcomestyle: {
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signuptext: {
        color: '#E2F163',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 8
    }
});
