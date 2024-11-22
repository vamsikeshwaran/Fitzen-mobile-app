import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Progress = ({ route, navigation }) => {
    const { name } = route.params;
    const [profiledetails, setprofiledetails] = useState([]);
    const [progressdetails, setprogressdetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getResponse = await axios.get(`http://vamsikeshwarans-macbook-air.local:5001/fetch/${name}`);
                const progdet = await axios.get(`http://vamsikeshwarans-macbook-air.local:5001/progress/${name}`)
                console.log(progdet.data);
                setprogressdetails(progdet.data)
                setprofiledetails(getResponse.data[0]);
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

    const firstLetter = profiledetails.name ? profiledetails.name.charAt(0).toUpperCase() : '';

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Progress Tracking</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <View style={styles.profileContainer}>
                <View style={styles.profileIcon}>
                    <Text style={styles.profileLetter}>{firstLetter}</Text>
                </View>
                <Text style={styles.profileName}>{profiledetails.name}</Text>
                <Text style={styles.profileDetail}>Age: <Text style={styles.profileValue}>{profiledetails.age} years</Text></Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <View style={styles.sverticalLine} />
                        <View>
                            <Text style={styles.statValue}>{profiledetails.weight} Kg</Text>
                            <Text style={styles.statLabel}>Weight</Text>
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <View style={styles.sverticalLine} />
                        <View>
                            <Text style={styles.statValue}>{profiledetails.height} cm</Text>
                            <Text style={styles.statLabel}>Height</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.activityLogText}>Activity Logs</Text>
            <ScrollView style={styles.logContainer}>
                {progressdetails.map((detail, index) => (
                    <View key={index} style={styles.logEntry}>
                        <Image source={require('../assets/Infocon.png')} style={{ width: 60, height: 60, borderRadius: 80, marginLeft: 10, marginTop: 10 }} resizeMode='contain' />
                        <View style={{ gap: 3, marginRight: 20 }}>
                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
                                <Icon name="flame" size={17} color="#B3A0FF" style={{ marginTop: 2 }} />
                                <Text style={{ marginTop: 3 }}>{detail.cal} Kcal</Text>
                            </View>
                            <Text style={{ fontWeight: 'medium', fontSize: 19, width: 180 }}>{detail.exerciseName}</Text>
                            <Text style={{ color: '#896CFE' }}>{detail.date}-{detail.time}</Text>
                        </View>
                        <Text style={{ position: 'aboslute', top: 28, fontSize: 20, right: 18 }}>X {detail.count}</Text>
                    </View>
                ))
                }
            </ScrollView >
            <View style={{ width: '100%', height: 60, backgroundColor: '#B3A0FF', position: 'absolute', top: 783, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70 }}>
                <Icon name="home" size={30} color="white" onPress={handleback} />
                <Icon name="stats-chart" size={30} color="#E2F163" />
                <Icon name="star" size={30} color="white" />
                <Icon name="person" size={30} color="white" onPress={handleprofilenavigator} />
            </View>
        </View >
    );
}

export default Progress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#232323',
        paddingBottom: 20,
    },
    profileContainer: {
        width: '100%',
        height: 170,
        backgroundColor: '#B3A0FF',
        justifyContent: 'center',
        position: 'absolute',
        top: 150,
    },
    profileIcon: {
        height: 100,
        width: 100,
        backgroundColor: '#232323',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        right: 30,
    },
    profileLetter: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    profileName: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25,
        marginLeft: 15,
        marginBottom: 5,
    },
    profileDetail: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 5,
    },
    profileValue: {
        fontWeight: 'normal',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    statBox: {
        flexDirection: 'row',
    },
    sverticalLine: {
        width: 10,
        height: 47,
        borderRadius: 10,
        backgroundColor: '#E2F163',
        marginTop: 10,
        marginLeft: 18,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
        marginTop: 10,
    },
    statLabel: {
        marginLeft: 10,
        marginTop: 5,
        color: 'white',
    },
    activityLogText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#E2F163',
        marginTop: 250,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
    },
    logContainer: {
        flex: 0.3,
        width: '90%',
        marginBottom: 30
    },
    logEntry: {
        height: 80,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 20
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80,
    },
    headerText: {
        color: '#896CFE',
        marginTop: 77,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: -60
    },
});
