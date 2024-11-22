import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const MainPage = ({ navigation }) => {
    function infopagenavigator() {
        navigation.navigate('Info')
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/mainpage.png')}
                style={styles.backgroundImage}
                imageStyle={{ resizeMode: 'cover' }}  // Ensures the image covers the entire screen
            >
                <View style={{ width: 380, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>
                        Welcome to
                    </Text>
                    <Image
                        source={require('../assets/splash.png')}  // Adjust the path to your image
                        style={styles.image}
                    />
                    <Text style={styles.subtext}>
                        An AI based mobile app for personalised fitness tracking
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={infopagenavigator}>
                        <Text style={styles.buttonText}>Get Started  →</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0,
    },
    backgroundImage: {
        flex: 1,
        width: '101%',
        height: '101%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: -20
    },
    text: {
        color: '#E2F163',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    subtext: {
        color: '#E2F163',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        fontStyle: 'italic',
        width: 300
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginTop: -100,
        marginBottom: -100
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#B3A0FF'
    },
    buttonText: {
        color: 'white',  // Text color for the button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

