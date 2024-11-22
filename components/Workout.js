import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Workout = ({ route, navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { name } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const getResponse = await axios.get(`http://vamsikeshwarans-macbook-air.local:5001/fetch/${name}`);
                console.log(getResponse.data);

                // Prepare data for the POST request
                const requestData = {
                    gender: getResponse.data[0].gender,           // Ensure this is correct
                    age: getResponse.data[0].age,                  // Replace with actual data
                    weight: getResponse.data[0].weight,            // Ensure this is correct
                    height: getResponse.data[0].height,                                    // Replace with actual data
                    activity_level: getResponse.data[0].activity                      // Replace with actual data
                };

                // Send POST request
                const postResponse = await axios.post('http://vamsikeshwarans-macbook-air.local:5000/recommend', requestData);
                console.log('POST API Response:', postResponse.data);
                setWorkouts(postResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);
    function handleback() {
        navigation.navigate('Home', { name });
    }
    function handleExerciseDescription(workout) {
        navigation.navigate('ExerciseDesc', { workout, name });
    }
    function handleprofilenavigator() {
        navigation.navigate('Profile', { name })
    }
    const toggleFavorite = (workout) => {
        if (favorites.includes(workout)) {
            setFavorites(favorites.filter((item) => item !== workout));
        } else {
            setFavorites([...favorites, workout]);
        }
    };

    function handleFavoritesPage() {
        navigation.navigate('Favorites', { favorites });
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={{ color: 'white', marginTop: 75, marginLeft: 60, fontSize: 25, fontWeight: 'bold', color: '#896CFE' }}>Personalised Workout</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <View style={{ width: '100%', height: 200, backgroundColor: '#B3A0FF', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/squat.png')} style={{ width: '80%', height: 150, marginTop: -2, marginLeft: -2, borderRadius: 20, position: 'absolute' }} />
                <View style={{ backgroundColor: '#E2F163', height: 20, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: -130, marginLeft: 150 }}>
                    <Text>Workout of the day</Text>
                </View>
                <View style={{ position: 'absolute', backgroundColor: 'black', width: 310, height: 60, opacity: 0.5, marginTop: 90 }}>

                </View>
                <Text style={{ fontSize: 20, color: '#E2F163', position: 'absolute', fontWeight: 'bold', opacity: 3 }}>Beginner Level Exercises</Text>
            </View>
            <Text style={{ marginTop: 15, marginLeft: 20, color: '#E2F163', fontWeight: 'medium', fontSize: 20 }}>Let's Go {name}</Text>
            <Text style={{ marginTop: 5, marginLeft: 20, color: 'white', fontWeight: 'medium', fontSize: 14 }}>Explore Different Workout Styles</Text>
            <ScrollView style={styles.scrollContainer}>
                {workouts.map((workout, index) => (
                    <TouchableOpacity key={index} style={styles.workoutBox} onPress={() => handleExerciseDescription(workout)}>
                        <View style={{ justifyContent: 'center', marginLeft: -5, gap: 2 }}>
                            <Text style={styles.exerciseTitle}>{workout.Exercise}</Text>
                            <Text style={styles.exerciseDescription}>{workout.Description}</Text>
                            <View style={{ flexDirection: 'row', gap: 35 }}>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Icon name="time" size={17} color="black" style={{ marginTop: 4 }} />
                                    <Text style={styles.exerciseInfo}>{workout['Time Taken (mins)']} minutes</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Icon name="flame" size={17} color="black" style={{ marginTop: 4 }} />
                                    <Text style={styles.exerciseInfo}>{workout['Calories Burned']} Kcal</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <FontAwesome5 name="running" size={17} color="black" style={{ marginTop: 4 }} />
                                    <Text style={styles.exerciseInfo}>{workout['Activity Level']}</Text>
                                </View>
                            </View>
                        </View>
                        <Icon
                            name={favorites.includes(workout) ? 'star' : 'star-outline'}
                            size={24}
                            color={favorites.includes(workout) ? '#E2F163' : 'black'}
                            style={{ position: 'absolute', right: 20, top: 20 }}
                            onPress={() => toggleFavorite(workout)}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={{ width: '100%', height: 60, backgroundColor: '#B3A0FF', position: 'absolute', top: 783, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70 }}>
                <Icon name="home" size={30} color="white" onPress={handleback} />
                <Icon name="stats-chart" size={30} color="white" />
                <Icon name="star" size={30} color="white" onPress={handleFavoritesPage} />
                <Icon name="person" size={30} color="white" onPress={handleprofilenavigator} />
            </View>
        </View>
    );
};

export default Workout;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#232323',
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80
    },
    scrollContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 70
    },
    workoutBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        height: 150,
        justifyContent: 'center',
    },
    exerciseTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#232323',
    },
    exerciseDescription: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },
    exerciseInfo: {
        marginTop: 5,
        fontSize: 12,
        color: '#777',
    },
    exerciseDescription: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
        marginBottom: 6
    }
});
