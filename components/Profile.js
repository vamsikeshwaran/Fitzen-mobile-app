import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Profile = ({ navigation, route }) => {
    const { name } = route.params;
    const [profiledetails, setprofiledetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getResponse = await axios.get(`http://vamsikeshwarans-macbook-air.local:5001/fetch/${name}`);
                console.log(getResponse.data);
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
        navigation.navigate('Profile', { name });
    }

    const firstLetter = profiledetails.name ? profiledetails.name.charAt(0).toUpperCase() : '';

    return (
        <View style={styles.maincontainer}>
            <View style={{ width: '100%', height: 310, backgroundColor: '#B3A0FF', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
                <Text style={styles.textStyle}>Back</Text>
                <View style={{ height: 100, width: 100, backgroundColor: '#232323', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={styles.profileLetter}>{firstLetter}</Text>
                </View>
                <Text style={{ color: 'white', marginTop: 8, fontSize: 25, fontWeight: 'bold' }}>{profiledetails.name}</Text>
                <Text style={{ color: 'white', marginTop: 2, fontSize: 15 }}>{profiledetails.email}</Text>
                <Text style={{ color: 'white', marginTop: 2, fontSize: 15 }}><Text style={{ color: 'white', marginTop: 2, fontSize: 15, fontWeight: 'bold' }}>Gender: </Text>{profiledetails.gender}</Text>
            </View>
            <View style={{ width: '80%', alignSelf: 'center', height: 60, backgroundColor: '#896CFE', position: 'absolute', top: 280, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 27 }}>
                <View>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{profiledetails.weight} Kg</Text>
                    <Text style={{ color: 'white' }}>Weight</Text>
                </View>
                <View style={styles.verticalLine1} />
                <View>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{profiledetails.age}</Text>
                    <Text style={{ color: 'white' }}>Years old</Text>
                </View>
                <View style={styles.verticalLine1} />
                <View>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{profiledetails.height} cm</Text>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Height</Text>
                </View>
            </View>
            <Text style={{ marginTop: 55, color: '#896CFE', fontWeight: 700, fontSize: 18, marginLeft: -255, marginBottom: 15 }}>Email</Text>
            <View style={{ width: '80%', backgroundColor: 'white', height: 40, borderRadius: 20, justifyContent: 'center', padding: 10 }}>
                <Text>{profiledetails.email}</Text>
            </View>
            <Text style={{ marginTop: 20, color: '#896CFE', fontWeight: 700, fontSize: 18, marginLeft: -220, marginBottom: 15 }}>Password</Text>
            <View style={{ width: '80%', backgroundColor: 'white', height: 40, borderRadius: 20, justifyContent: 'center', padding: 10 }}>
                <Text>{profiledetails.password}</Text>
            </View>
            <Text style={{ marginTop: 20, color: '#896CFE', fontWeight: 700, fontSize: 18, marginLeft: -255, marginBottom: 15 }}>Goal</Text>
            <View style={{ width: '80%', backgroundColor: 'white', height: 40, borderRadius: 20, justifyContent: 'center', padding: 10 }}>
                <Text>{profiledetails.goal}</Text>
            </View>
            <Text style={{ marginTop: 20, color: '#896CFE', fontWeight: 700, fontSize: 18, marginLeft: -185, marginBottom: 15 }}>Activity Level</Text>
            <View style={{ width: '80%', backgroundColor: 'white', height: 40, borderRadius: 20, justifyContent: 'center', padding: 10 }}>
                <Text>{profiledetails.activity}</Text>
            </View>
            <View style={styles.footer}>
                <Icon name="home" size={30} color="white" onPress={handleback} />
                <Icon name="stats-chart" size={30} color="white" />
                <Icon name="star" size={30} color="white" />
                <Icon name="person" size={30} color="#E2F163" onPress={handleprofilenavigator} />
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#232323',
        alignItems: 'center',
    },
    profileLetter: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        height: 60,
        backgroundColor: '#B3A0FF',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 70,
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 70,
        color: '#E2F163'
    },
    textStyle: {
        position: 'absolute',
        left: 53,
        top: 69,
        fontSize: 20,
        color: '#E2F163',
        fontWeight: 'bold'
    },
    verticalLine1: {
        width: 2,
        height: 30,
        backgroundColor: 'white',
    },
});
