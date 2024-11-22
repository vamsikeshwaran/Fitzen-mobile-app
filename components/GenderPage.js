import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const GenderPage = ({ navigation, route }) => {
    const { name } = route.params;
    const [selectedGender, setSelectedGender] = useState(null);
    async function agenavigator() {
        if (!selectedGender) {
            Alert.alert('Please select a gender'); // Alert if no gender is selected
            return;
        }

        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'gender', // Field to update in the collection
                newValue: selectedGender, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Age', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, marginBottom: 50 }}>What's Your Gender</Text>

            <TouchableOpacity
                style={[styles.gbutton, selectedGender === 'Male' && styles.selectedButton]}
                onPress={() => setSelectedGender('Male')}
            >
                <Icon name="male" size={90} color={selectedGender === 'Male' ? '#383838' : 'white'} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 17, fontSize: 26, marginBottom: 50 }}>Male</Text>

            <TouchableOpacity
                style={[styles.gbutton, selectedGender === 'Female' && styles.selectedButton]}
                onPress={() => setSelectedGender('Female')}
            >
                <Icon name="female" size={90} color={selectedGender === 'Female' ? '#383838' : 'white'} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 17, fontSize: 26, marginBottom: 30 }}>Female</Text>

            <TouchableOpacity style={styles.button} onPress={agenavigator}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GenderPage;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#232323'
    },
    gbutton: {
        height: 163,
        width: 163,
        borderRadius: 80, // Circle shape
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#383838',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#E2F163', // Change background color when selected
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 30,
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
