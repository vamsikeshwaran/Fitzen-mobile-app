import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';
import axios from 'axios';

const ExerciseDesc = ({ route, navigation }) => {
    const { workout, name } = route.params;
    function handleback() {
        navigation.navigate('Workout', { name });
    }
    async function handlerepnavigation() {
        try {
            await axios.post('http://vamsikeshwarans-macbook-air.local:8000/sendProgress', {
                collectionName: name,
                exerciseName: workout.Exercise,
                cal: workout['Calories Burned']
            });
            if (workout.Exercise === 'Barbell Squats') {
                Linking.openURL(`https://squat-calc.vercel.app/index1.html/?exercise=${workout.Exercise}&name=${name}`)
                    .catch(err => console.error("Failed to open URL: ", err));
            }
            else {
                Linking.openURL(`https://curl-calculator.vercel.app/?exercise=${workout.Exercise}&name=${name}`)
                    .catch(err => console.error("Failed to open URL: ", err));
            }
        } catch (error) {
            console.error("Error sending progress data:", error);
        }
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={styles.headerText}>Exercise Details</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: workout.Image }} style={styles.exerciseImage} resizeMode='cover' />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.exerciseTitle}>{workout.Exercise}</Text>
                <Text style={styles.exerciseDescription}>{workout.Description}</Text>
                <View style={{ flexDirection: 'row', gap: 15, backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="time" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>{workout['Time Taken (mins)']} minutes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="flame" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>{workout['Calories Burned']} Kcal</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <FontAwesome5 name="running" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>{workout['Activity Level']}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlerepnavigation}>
                <Icon name="calculator" size={20} color="#896CFE" />
                <Text style={styles.buttonText}>Rep Calculator</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExerciseDesc;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#232323', // Added padding to control layout
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80,
    },
    headerText: {
        color: '#896CFE',
        marginTop: 76,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 65
    },
    imageContainer: {
        width: '100%',
        height: 470,
        backgroundColor: '#B3A0FF',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseImage: {
        width: 300,
        height: 430,
        borderRadius: 20,
    },
    infoBox: {
        width: '87%',
        height: 150,
        backgroundColor: '#E2F163',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 24,
        padding: 10,
    },
    exerciseTitle: {
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 10,
        color: '#232323',
    },
    exerciseDescription: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#555',
    },
    exerciseInfo: {
        fontSize: 14,
        color: '#777',
        marginVertical: 2,
    },
    button: {
        width: 200,
        padding: 5,
        borderRadius: 20,
        marginTop: 20,
        borderColor: '#896CFE',
        borderWidth: 2,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: 570,
        backgroundColor: 'white',
        flexDirection: 'row',
        gap: 10
    },
    buttonText: {
        color: '#896CFE',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
