import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const AgePicker = ({ navigation, route }) => {
    const { name } = route.params;
    const [selectedAge, setSelectedAge] = useState(2);
    const scrollViewRef = useRef(null);

    const ages = Array.from({ length: 100 }, (_, i) => i + 1);

    function handleback() {
        navigation.navigate('Gender')
    }

    async function handleweightnavigator() {
        if (!selectedAge) {
            Alert.alert('Please select a Age'); // Alert if no gender is selected
            return;
        }

        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'age', // Field to update in the collection
                newValue: selectedAge, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Weight', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }

    const scrollToDefaultAge = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 100, animated: false });
        }
    };

    return (
        <View style={styles.container}>
            <Icon name="arrow-back" size={24} color="#E2F163" style={styles.iconStyle} onPress={handleback} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginBottom: 300 }}>How Old Are You?</Text>
            <Text style={styles.selectedAge}>{selectedAge}</Text>
            <View style={styles.triangle} />

            {/* Wrapper for the vertical line and scroll view */}
            <View style={styles.scrollContainerWrapper}>
                {/* Vertical Line */}
                <View style={styles.verticalLine}></View>

                {/* Scroll Wrapper */}
                <View style={styles.scrollWrapper}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                        snapToAlignment="center"
                        snapToInterval={100}
                        decelerationRate="fast"
                        onScroll={(e) => {
                            const index = Math.round(e.nativeEvent.contentOffset.x / 100);
                            setSelectedAge(ages[index]);
                        }}
                        scrollEventThrottle={16}
                        onLayout={scrollToDefaultAge}
                    >
                        {ages.map((age, index) => (
                            <View key={index} style={styles.ageContainer}>
                                <Text
                                    style={[
                                        styles.ageText,
                                        selectedAge === age && styles.selectedAgeText,
                                    ]}
                                >
                                    {age}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.verticalLine1}></View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleweightnavigator}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AgePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
    },
    selectedAge: {
        fontSize: 65,
        fontWeight: 'bold',
        color: 'white',
        marginTop: -200, // Adjusted margin to move the number closer to the top
    },
    triangle: {
        width: 20,
        height: 20,
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E2F163',
        marginVertical: 30,
    },
    scrollContainerWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    verticalLine: {
        width: 2,
        height: 120,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        marginTop: -8,
        right: 240
    },
    verticalLine1: {
        width: 2,
        height: 120,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        marginTop: -8,
        right: 150
    },
    scrollWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: '#B3A0FF',
        justifyContent: 'center',
    },
    scrollContainer: {
        paddingHorizontal: Dimensions.get('window').width / 2 - 95,
    },
    ageContainer: {
        width: 100, // Width of each age item
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        gap: 25,
    },
    ageText: {
        fontSize: 40,
        color: 'grey', // Faded color for non-selected items
    },
    selectedAgeText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white', // Highlighted color for selected item
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 130,
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
        top: 80
    },
});


