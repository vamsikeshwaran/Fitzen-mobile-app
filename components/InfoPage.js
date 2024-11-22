import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'


const InfoPage = ({ navigation }) => {
    const [count, setcount] = useState(0);
    function handlenext() {
        setcount(count + 1)
    }
    function handleloginnavigation() {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.maincontainer}>
            <Pressable onPress={handleloginnavigation}>
                <Text style={styles.skiptext}>Skip  →</Text>
            </Pressable>
            <Image source={require('../assets/splash.png')} style={{ width: 300, height: 300, marginTop: -300 }} resizeMode='contain' />
            {count == 0 &&
                <>
                    <View style={{ width: '100%', height: 200, backgroundColor: '#B3A0FF', justifyContent: 'center', alignItems: 'center', flex: 0.25, gap: 5 }}>
                        <Image source={require('../assets/Infocon.png')} style={{ width: 80, height: 80 }} resizeMode='contain' />
                        <Text style={styles.text}>Start your journey towards a more active lifestyle</Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
                            <View style={{ width: 30, height: 6, backgroundColor: 'white' }} />
                            <View style={{ width: 30, height: 6, backgroundColor: '#896CFE' }} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handlenext}>
                        <Text style={styles.buttonText}>Next  →</Text>
                    </TouchableOpacity>
                </>
            }
            {count == 1 &&
                <>
                    <View style={{ width: '100%', height: 200, backgroundColor: '#B3A0FF', justifyContent: 'center', alignItems: 'center', flex: 0.25, gap: 5 }}>
                        <Image source={require('../assets/Infocon1.png')} style={{ width: 80, height: 80 }} resizeMode='contain' />
                        <Text style={styles.text}>Find Nutrition Tips That Fit your Lifestyle</Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
                            <View style={{ width: 30, height: 6, backgroundColor: '#896CFE' }} />
                            <View style={{ width: 30, height: 6, backgroundColor: 'white' }} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleloginnavigation}>
                        <Text style={styles.buttonText}>Login  →</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

export default InfoPage

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323'
    },
    text: {
        fontSize: '25',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',  // Text color for the button
        fontSize: 18,
        fontWeight: 'bold',
    },
    skiptext: {
        color: '#E2F163',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -240,
        marginLeft: 300
    }
})