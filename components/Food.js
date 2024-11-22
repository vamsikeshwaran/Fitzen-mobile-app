import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Food = ({ route, navigation }) => {
    const [foods, setfoods] = useState([]);
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
                };

                // Send POST request
                const postResponse = await axios.post('http://vamsikeshwarans-macbook-air.local:7000/recommend_food', requestData);
                console.log('POST API Response:', postResponse.data);
                setfoods(postResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);
    function handleback() {
        navigation.navigate('Home', { name });
    }
    function handleprofilenavigator() {
        navigation.navigate('Profile', { name })
    }
    function handleFoodDescription(food) {
        navigation.navigate('FoodDesc', { food, name });
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={{ color: 'white', marginTop: 77, marginLeft: 60, fontSize: 25, fontWeight: 'bold', color: '#896CFE' }}>Food Recommendation</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <View style={{ width: '100%', height: 200, backgroundColor: '#B3A0FF', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/receipe.png')} style={{ width: '80%', height: 150, marginTop: -2, marginLeft: -2, borderRadius: 20, position: 'absolute' }} />
                <View style={{ backgroundColor: '#E2F163', height: 20, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: -130, marginLeft: 150 }}>
                    <Text>Receipe of the day</Text>
                </View>
                <View style={{ position: 'absolute', backgroundColor: 'black', width: 310, height: 50, opacity: 0.4, marginTop: 90 }}>

                </View>
                <Text style={{ fontSize: 20, color: '#E2F163', position: 'absolute', fontWeight: 'bold', opacity: 3 }}>Food Recipes</Text>
            </View>
            <Text style={{ marginTop: 15, marginLeft: 20, color: '#E2F163', fontWeight: 'medium', fontSize: 20 }}>Dine in Style, {name}!</Text>
            <Text style={{ marginTop: 5, marginLeft: 20, color: 'white', fontWeight: 'medium', fontSize: 14 }}>Discover Your Next Favorite Dish!</Text>
            <ScrollView style={styles.scrollContainer}>
                {foods.map((food, index) => (
                    <TouchableOpacity key={index} style={styles.foodBox} onPress={() => handleFoodDescription(food)}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 2, marginRight: 10 }}>
                                <View style={{ width: 190 }}>
                                    <Text style={styles.foodTitle}>{food["Food Name"]}</Text>
                                </View>
                                <View style={{ width: 180 }}>
                                    <Text style={styles.foodDescription}>{food.Description}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Icon name="flame" size={17} color="black" />
                                        <Text style={styles.foodInfo}>{food.Calories} Kcal</Text>
                                    </View>
                                </View>
                            </View>
                            <Image
                                source={{ uri: food.Image }}
                                style={styles.image}
                            />
                        </View>
                    </TouchableOpacity>

                ))}
            </ScrollView>

            <View style={{ width: '100%', height: 60, backgroundColor: '#B3A0FF', position: 'absolute', top: 783, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70 }}>
                <Icon name="home" size={30} color="white" onPress={handleback} />
                <Icon name="stats-chart" size={30} color="white" />
                <Icon name="star" size={30} color="white" />
                <Icon name="person" size={30} color="white" onPress={handleprofilenavigator} />
            </View>
        </View>
    );
};

export default Food

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
    foodBox: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        height: 160,
        justifyContent: 'center',
    },
    foodTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#232323',
    },
    foodDescription: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },
    foodInfo: {
        marginTop: 2,
        fontSize: 12,
        color: '#777',
    },
    foodDescription: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
        marginBottom: 6
    },
    image: {
        width: 160,
        height: 161,
        borderRadius: 30,
        position: 'absolute',
        top: -10,
        right: -20
    },
})