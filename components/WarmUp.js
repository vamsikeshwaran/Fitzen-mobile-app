import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WarmUp = ({ route, navigation }) => {
    const { name, time, cal, url, desc, ename } = route.params;
    function handlerepnavigation() {
        navigation.navigate('Rep');
    }
    function handleback() {
        navigation.navigate('Home', { name });
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={styles.headerText}>Exercise Details</Text>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: url }} style={styles.exerciseImage} resizeMode='cover' />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.exerciseTitle}>{ename}</Text>
                <Text style={styles.exerciseDescription}>{desc}</Text>
                <View style={{ flexDirection: 'row', gap: 15, backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="time" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>{time} minutes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Icon name="flame" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>{cal} Kcal</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <FontAwesome5 name="running" size={17} color="black" style={{ marginTop: 2 }} />
                        <Text style={styles.exerciseInfo}>Beginner</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WarmUp

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
})