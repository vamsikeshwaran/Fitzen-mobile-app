import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const PhysicalActivity = ({ navigation, route }) => {
    const { name } = route.params;
    const [physicallevel, setphysicallevel] = useState();
    async function handlehomepagenavigator() {
        if (!physicallevel) {
            Alert.alert('Please select a physical level'); // Alert if no gender is selected
            return;
        }
        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'activity', // Field to update in the collection
                newValue: physicallevel, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Home', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, marginBottom: 50 }}>Physical Activty Level</Text>
            <TouchableOpacity style={[styles.button, physicallevel === 'Beginner' && styles.selectedButton]} onPress={() => setphysicallevel('Beginner')}>
                <Text style={[styles.buttonText, physicallevel === 'Beginner' && styles.selectedtext]}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, physicallevel === 'Intermediate' && styles.selectedButton]} onPress={() => setphysicallevel('Intermediate')}>
                <Text style={[styles.buttonText, physicallevel === 'Intermediate' && styles.selectedtext]}>Intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, physicallevel === 'Advance' && styles.selectedButton]} onPress={() => setphysicallevel('Advance')}>
                <Text style={[styles.buttonText, physicallevel === 'Advance' && styles.selectedtext]}>Advance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cbutton} onPress={handlehomepagenavigator}>
                <Text style={styles.cbuttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PhysicalActivity

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 38,
        marginTop: 20,
        backgroundColor: 'white',
        marginTop: 30,
        width: '80%',
        alignItems: 'center',
        height: 60,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#B3A0FF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#E2F163',
    },
    selectedtext: {
        color: 'black'
    },
    cbutton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 100,
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#383838'
    },
    cbuttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})