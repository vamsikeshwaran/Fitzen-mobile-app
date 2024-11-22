import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const WeightPage = ({ navigation, route }) => {
    const { name } = route.params;
    const [selectedWeight, setSelectedWeight] = useState(10); // Default weight
    const [weightunit, setweightunit] = useState('Kg');
    const scrollViewRef = useRef(null);
    const weights = Array.from({ length: 500 }, (_, i) => i + 10);

    function handlekg() {
        setweightunit('Kg')
    }
    function handlelb() {
        setweightunit('Lb')
    }
    async function heightnavigator() {
        if (!selectedWeight) {
            Alert.alert('Please select a Weight'); // Alert if no gender is selected
            return;
        }

        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'weight', // Field to update in the collection
                newValue: selectedWeight, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Height', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }

    useEffect(() => {
        // Scroll to the default weight when component mounts
        if (scrollViewRef.current) {
            const defaultIndex = weights.indexOf(10);
            scrollViewRef.current.scrollTo({ x: defaultIndex * 100, animated: false }); // Adjust based on new width
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ width: 145, height: 63, backgroundColor: '#1C1C1C', position: 'absolute', top: 327, zIndex: 1, left: 0 }} />
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, marginBottom: 30 }}>What Is Your Weight ?</Text>
            <View style={{ flexDirection: 'row', gap: 40, marginBottom: 60 }}>
                <TouchableOpacity style={styles.wbutton} onPress={handlekg}>
                    <Text style={styles.wbuttonText}>Kg</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wbutton} onPress={handlelb}>
                    <Text style={styles.wbuttonText}>Lb</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollWrapper}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={100} // Adjusted to match new width
                    decelerationRate="fast"
                    onScroll={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / 100); // Adjusted calculation
                        setSelectedWeight(weights[index]);
                    }}
                    scrollEventThrottle={16}
                >
                    {weights.map((weight, index) => (
                        <View key={index} style={styles.scaleItem}>
                            {/* Number above the line */}
                            <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1C', height: 70, marginTop: -20, marginBottom: 15 }}>
                                <Text
                                    style={[
                                        styles.scaleNumber,
                                        selectedWeight === weight && styles.highlightedScaleNumber
                                    ]}
                                >
                                    {weight}
                                </Text>

                            </View>
                            <View style={styles.lineContainer}>
                                <View style={styles.smallLinesContainer}>
                                    <View style={styles.verticalsmallLine} />
                                    <View style={styles.verticalsmallLine} />
                                </View>
                                <View
                                    style={[
                                        styles.verticalLine,
                                        selectedWeight === weight && styles.highlightedVerticalLine
                                    ]}
                                />
                                <View style={styles.smallLinesContainer}>
                                    <View style={styles.verticalsmallLine} />
                                    <View style={styles.verticalsmallLine} />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Central triangle indicator */}
            <View style={styles.triangle} />
            <View style={styles.selectedWeightDisplay}>
                <Text style={styles.number}>{selectedWeight}</Text>
                <Text style={styles.unit}>{weightunit}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={heightnavigator}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WeightPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
    },
    selectedWeightDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        marginRight: -40
    },
    number: {
        fontSize: 75,
        fontWeight: 'bold',
        color: 'white',
    },
    unit: {
        fontSize: 25,
        color: 'gray',
        marginLeft: 10,
    },
    scrollWrapper: {
        height: 150,
        width: '100%',
        backgroundColor: '#9A75FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scaleItem: {
        width: 100, // Width for each weight item
        justifyContent: 'center',
        alignItems: 'center',
        right: -145
    },
    scaleNumber: {
        fontSize: 30,
        color: '#B2B2B2',
        marginBottom: 10,
    },
    highlightedScaleNumber: {
        fontWeight: 'bold',
        color: 'white',
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E2F163',
        marginTop: 40,
        marginBottom: 20
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalLine: {
        width: 2,
        height: 60,
        backgroundColor: 'white',
        marginRight: 15,
        marginLeft: 15 // Spacing between the big line and the small lines
    },
    highlightedVerticalLine: {
        backgroundColor: 'yellow',
    },
    smallLinesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        gap: 25,
    },
    verticalsmallLine: {
        width: 1,
        height: 30,
        backgroundColor: 'white',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 10,
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    wbutton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#E2F163',
        borderWidth: 2,
        width: 140,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wbuttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

