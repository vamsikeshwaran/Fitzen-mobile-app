import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Favourites = ({ route }) => {
    const { favorites } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Workouts</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} />
            <View style={{ height: 652 }}>
                <ScrollView>
                    {favorites.length > 0 ? (
                        favorites.map((workout, index) => (
                            <View key={index} style={styles.workoutBox}>
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
                            </View>
                        ))
                    ) : (
                        <View style={{ position: 'absolute', alignSelf: 'center', top: 250 }}>
                            <Icon name="search" size={50} color="#E2F163" style={{ alignSelf: 'center' }} />
                            <Text style={styles.emptyMessage}>No favorites added yet!</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={{ width: '107%', height: 60, backgroundColor: '#B3A0FF', position: 'absolute', top: 783, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70 }}>
                <Icon name="home" size={30} color="white" />
                <Icon name="stats-chart" size={30} color="white" />
                <Icon name="star" size={30} color="#E2F163" />
                <Icon name="person" size={30} color="white" />
            </View>
        </View>
    );
}

export default Favourites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232323',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#896CFE',
        marginBottom: 20,
        marginTop: 57,
        marginLeft: 35
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
    emptyMessage: {
        color: '#E2F163',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80
    },
})