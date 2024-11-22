import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const SetupIntroPage = ({ navigation, route }) => {
    const { name } = route.params;
    function handlegenderpage() {
        console.log(name)
        navigation.navigate('Gender', { name })
    }
    return (
        <View style={styles.maincontainer}>
            <Image source={require('../assets/setup.png')} style={{ flex: 0.9, marginBottom: 40 }} resizeMode='contain' />
            <Text style={{ fontSize: 30, color: '#E2F163', textAlign: 'center' }}>Consistency Is the Key To progress Don't Give Up!</Text>
            <View style={{ width: '100%', height: 100, backgroundColor: '#B3A0FF', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Start the setup procedure for fitzen by clicking the button below</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlegenderpage}>
                <Text style={styles.buttonText}>Start Setup  →</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SetupIntroPage

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#232323'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 20,
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})