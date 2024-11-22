import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FoodDesc = ({ route, navigation }) => {
    const { food, name } = route.params;

    const ingredients = food.Ingredients.split(',').map(item => item.trim());

    function handleback() {
        navigation.navigate('Food', { name })
    }

    return (
        <View style={styles.maincontainer}>
            <Text style={styles.headerText}>Food Details</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <Text style={styles.foodName}>{food["Food Name"]}</Text>
            <View style={{ flexDirection: 'row', gap: 35, marginLeft: 25 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                    <Icon name="flame" size={17} color="#896CFE" />
                    <Text style={{ color: 'white' }}>{food.Calories} Kcal</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                    <FontAwesome5 name="utensils" size={14} color="#896CFE" />
                    <Text style={{ color: 'white' }}>{food.Cuisine}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 230, backgroundColor: '#B3A0FF', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image
                    source={{ uri: food.Image }}
                    style={styles.image}
                />
            </View>
            <Text style={{ color: '#E2F163', marginLeft: 25, fontSize: 20, fontWeight: 'medium', marginVertical: 15 }}>Ingredients</Text>
            <View style={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
                ))}
            </View>
            <Text style={{ color: '#E2F163', marginLeft: 25, fontSize: 20, fontWeight: 'medium', marginVertical: 15 }}>Preparation</Text>
            <View style={{ width: '95%' }}>
                <Text style={styles.description}>{food.Description}</Text>
            </View>
            <Text style={{ color: '#E2F163', marginLeft: 25, fontSize: 20, fontWeight: 'medium', marginVertical: 15 }}>Type of Food</Text>
            <View style={{ marginLeft: 50 }}>
                <Text style={styles.ingredientItem}>• {food["Dietary Tag"]}</Text>
            </View>
            <Text style={styles.footerText}>Enjoy your meal, <Text style={{ color: 'white', fontWeight: 'bold' }}>{name}</Text></Text>
        </View>
    );
};

export default FoodDesc;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#232323', // Added padding to control layout
    },
    image: {
        width: 320,
        height: 200,
        borderRadius: 20,
    },
    foodName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E2F163',
        marginVertical: 15,
        marginLeft: 25
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginLeft: 25
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#777',
    },
    headerText: {
        color: '#896CFE',
        marginTop: 76,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 65
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80,
    },
    ingredientsList: {
        marginLeft: 45,
    },
    ingredientItem: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    footerText: {
        fontSize: 18,
        color: '#896CFE',
        marginTop: 30,
        textAlign: 'center',
    },
});
