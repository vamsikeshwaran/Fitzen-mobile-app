import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const HomePage = ({ route, navigation }) => {
    const { name } = route.params;
    const [showsearchbar, setshowsearchbar] = useState(false)
    function handlesearchbar() {
        if (showsearchbar == false) {
            setshowsearchbar(true)
        }
        else {
            setshowsearchbar(false)
        }
    }
    function handleworkoutnavigator() {
        navigation.navigate('Workout', { name })
    }
    function handleprofilenavigator() {
        navigation.navigate('Profile', { name })
    }
    function handlefoodnavigator() {
        navigation.navigate('Food', { name })
    }
    function handleprogressnavigator() {
        navigation.navigate('Progress', { name })
    }
    function handlesquat() {
        navigation.navigate('Warmup', { name: name, time: 12, cal: 120, url: 'https://media.self.com/photos/5ea9bc77bb9c6b75996c7e91/1:1/w_3351,h_3351,c_limit/squats_woman_exercise.jpg', desc: 'Squatting is a lower-body exercise by bending the knees and hips.', ename: 'Squat' })
    }
    function handleplank() {
        navigation.navigate('Warmup', { name: name, time: 15, cal: 80, url: 'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_484,c_limit/0d9c9b11-0f3d-4568-a11e-ec601e88a503/what-muscles-do-planks-work-experts-explain.jpg', desc: 'Streching is the free movement of arms and legs', ename: 'Full Body Streching' })
    }
    return (
        <View style={styles.maincontainer}>
            <View style={{ padding: 20, flexDirection: 'row', marginTop: -50 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#896CFE', marginBottom: 7 }}>Welcome, {name}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'medium', color: 'white' }}>It's time to challenge your limits.</Text>
                    <View style={{ width: 250 }}></View>
                    {showsearchbar &&
                        <View style={styles.container}>
                            <Icon name="search" size={24} color="#896CFE" style={styles.icon} />
                            <TextInput
                                placeholder="Search for exercise"
                                style={styles.input}
                            />
                        </View>
                    }
                </View>
                <Icon name="search" size={24} color="#896CFE" style={[styles.befselsearch, showsearchbar && styles.onselecsearch]} onPress={handlesearchbar} />
            </View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#E2F163', paddingHorizontal: 20 }}>Fitzen features</Text>
            <View style={{ padding: 20, flexDirection: 'row', gap: 43 }}>
                <TouchableOpacity onPress={handleworkoutnavigator}>
                    <Icon name="barbell" size={60} style={{ color: '#B3A0FF' }} />
                    <Text style={{ textAlign: 'center', color: '#B3A0FF' }}>Workout</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine1}></View>
                <TouchableOpacity onPress={handleprogressnavigator}>
                    <Icon name="trending-up" size={60} color="#B3A0FF" />
                    <Text style={{ width: 60, textAlign: 'center', color: '#B3A0FF' }}>Progress Tracking</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine1}></View>
                <TouchableOpacity onPress={handlefoodnavigator}>
                    <Icon name="nutrition" size={55} color="#B3A0FF" />
                    <Text style={{ marginTop: 10, color: '#B3A0FF' }}>Nutrition</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 160, backgroundColor: '#B3A0FF', marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 324, height: 126, backgroundColor: '#232323', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 24, color: '#E2F163', width: 110, textAlign: 'center', fontWeight: 'medium', marginLeft: 20, marginBottom: 10 }}>Weekly Challenge</Text>
                        <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', width: 150 }}>Plank With Hip Twist</Text>
                    </View>
                    <Image source={require('../assets/plank.png')} style={{ width: 175, height: 126, borderRadius: 20 }} />
                </View>
            </View>
            <View style={{ height: 270 }}>
                <ScrollView>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#E2F163', paddingHorizontal: 20 }}>Warm-Up Workout</Text>
                    <View style={{ padding: 15, flexDirection: 'row', gap: 13 }}>
                        <TouchableOpacity style={{ width: 175, height: 207, borderColor: 'white', borderWidth: 2, borderRadius: 20 }} onPress={handlesquat}>
                            <Image source={require('../assets/squat.png')} style={{ width: 175, height: 110, marginTop: -2, marginLeft: -2, borderRadius: 20 }} />
                            <Text style={{ fontSize: 15, color: '#E2F163', marginTop: 7, marginLeft: 5 }}>Squat Exercise</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="time" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3, marginRight: 12 }}>12 Minutes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="flame" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3 }}>120 Kcal</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 175, height: 207, borderColor: 'white', borderWidth: 2, borderRadius: 20 }} onPress={handleplank}>
                            <Image source={require('../assets/strech.png')} style={{ width: 175, height: 110, marginTop: -2, marginLeft: -2, borderRadius: 20 }} />
                            <Text style={{ fontSize: 15, color: '#E2F163', marginTop: 7, marginLeft: 5 }}>Full Body stretching</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="time" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3, marginRight: 12 }}>15 Minutes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="flame" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3 }}>80 Kcal</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#E2F163', paddingHorizontal: 20 }}>Healthy Foods</Text>
                    <View style={{ padding: 15, flexDirection: 'row', gap: 13 }}>
                        <TouchableOpacity style={{ width: 175, height: 207, borderColor: 'white', borderWidth: 2, borderRadius: 20 }}>
                            <Image source={require('../assets/toast.png')} style={{ width: 175, height: 110, marginTop: -2, marginLeft: -2, borderRadius: 20 }} />
                            <Text style={{ fontSize: 15, color: '#E2F163', marginTop: 7, marginLeft: 5 }}>Avocado and egg toast</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="time" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3, marginRight: 12 }}>15 Minutes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="flame" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3 }}>70 Kcal</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 175, height: 207, borderColor: 'white', borderWidth: 2, borderRadius: 20 }}>
                            <Image source={require('../assets/fruitjuice.png')} style={{ width: 175, height: 110, marginTop: -2, marginLeft: -2, borderRadius: 20 }} />
                            <Text style={{ fontSize: 15, color: '#E2F163', marginTop: 7, marginLeft: 5 }}>Fruit Smoothie</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="time" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3, marginRight: 12 }}>5 Minutes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 3, marginTop: 8 }}>
                                <Icon name="flame" size={23} color="#B3A0FF" />
                                <Text style={{ color: 'white', marginTop: 3 }}>20 Kcal</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={{ width: '100%', height: 60, backgroundColor: '#B3A0FF', position: 'absolute', top: 783, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70 }}>
                <Icon name="home" size={30} color="#E2F163" />
                <Icon name="stats-chart" size={30} color="white" onPress={handleprogressnavigator} />
                <Icon name="star" size={30} color="white" />
                <Icon name="person" size={30} color="white" onPress={handleprofilenavigator} />
            </View>
        </View >
    )
}

export default HomePage

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#232323',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 40,
        marginTop: 15,
        width: 350
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    onselecsearch: {
        marginLeft: -30
    },
    befselsearch: {
        marginLeft: 75
    },
    verticalLine1: {
        width: 2,
        height: 50,
        backgroundColor: '#E2F163',
        marginTop: 15
    },
})