import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

const GoalPage = ({ navigation, route }) => {
    const { name } = route.params;
    const [selectedId, setSelectedId] = useState(null);
    const [selectedlabel, setSelectedlabel] = useState(null);

    const radioButtons = [
        { id: '1', label: 'Lose Weight' },
        { id: '2', label: 'Gain Weight' },
        { id: '3', label: 'Shape Body' },
        { id: '4', label: 'Others' }
    ];

    async function physicalactivityavigator() {
        if (!selectedlabel) {
            Alert.alert('Please select a goal'); // Alert if no gender is selected
            return;
        }

        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'goal', // Field to update in the collection
                newValue: selectedlabel, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Physical', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }

    const handleRadioPress = (id, label) => {
        if (selectedId === id) {
            setSelectedId(null);
            setSelectedlabel(null)
        } else {
            setSelectedId(id);
            setSelectedlabel(label)
        }
    };

    return (
        <View style={styles.maincontainer}>
            <Text style={styles.titleText}>What Is Your Goal?</Text>
            <View style={styles.optionsContainer}>
                <View style={{ width: '100%', height: 360, backgroundColor: '#B3A0FF', justifyContent: 'center', alignItems: 'center' }}>
                    {radioButtons.map((button) => (
                        <TouchableOpacity
                            key={button.id}
                            style={styles.option}
                            onPress={() => handleRadioPress(button.id, button.label)}
                        >
                            <Text style={styles.optionText}>{button.label}</Text>
                            <View style={[
                                styles.radioCircle,
                                selectedId === button.id && selectedlabel === button.label && styles.radioCircleSelected
                            ]} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={physicalactivityavigator}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GoalPage;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
    },
    titleText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
        marginBottom: 90,
    },
    optionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    option: {
        width: '80%',
        height: 50,
        borderRadius: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    optionText: {
        fontSize: 18,
        color: 'black',
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        backgroundColor: '#000',
    },
    button: {
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
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
