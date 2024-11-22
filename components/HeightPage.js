import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HeightPage = ({ navigation, route }) => {
    const { name } = route.params;
    const [selectedHeight, setSelectedHeight] = useState(165); // Default height
    const scrollViewRef = useRef(null);
    const heights = Array.from({ length: 100 }, (_, i) => 155 + i); // Heights from 155 to 255 cm

    useEffect(() => {
        // Scroll to the default height (165) when component mounts
        if (scrollViewRef.current) {
            const defaultIndex = heights.indexOf(165);
            scrollViewRef.current.scrollTo({ y: defaultIndex * 100, animated: false });
        }
    }, []);

    async function goalnavigator() {
        if (!selectedHeight) {
            Alert.alert('Please select a height'); // Alert if no gender is selected
            return;
        }

        try {
            const response = await axios.put(`http://vamsikeshwarans-macbook-air.local:5001/update/${name}`, {
                field: 'height', // Field to update in the collection
                newValue: selectedHeight, // New value (selected gender)
            });
            // Navigate to the Age page after successful update
            navigation.navigate('Goal', { name });
        } catch (error) {
            console.error('Error updating gender:', error);
            Alert.alert('Error', 'There was an error updating the gender.'); // Show error message
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, marginBottom: 30 }}>What Is Your Height ?</Text>
            <Text style={styles.selectedHeight}>
                {selectedHeight}
                <Text style={styles.cmText}> cm</Text>
            </Text>
            <View style={styles.triangle}></View>
            <View style={styles.scrollWrapper}>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={100} // Each height item has a height of 100
                    decelerationRate="fast"
                    onScroll={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.y / 100);
                        setSelectedHeight(heights[index]);
                    }}
                    scrollEventThrottle={16}
                >
                    {heights.map((height, index) => (
                        <View key={index} style={styles.scaleItem}>
                            <Text
                                style={[
                                    styles.scaleNumber,
                                    selectedHeight === height && styles.highlightedScaleNumber,
                                ]}
                            >
                                {height}
                            </Text>
                            <View>
                                <View style={styles.lineContainer}>
                                    <View style={styles.sverticalLine} />
                                </View>
                                <View style={styles.lineContainer}>
                                    <View style={styles.sverticalLine} />
                                </View>
                                <View style={styles.lineContainer}>
                                    <View style={styles.verticalLine} />
                                </View>
                                <View style={styles.lineContainer}>
                                    <View style={styles.sverticalLine} />
                                </View>
                                <View style={styles.lineContainer}>
                                    <View style={styles.sverticalLine} />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={goalnavigator}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
    },
    selectedHeight: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        marginRight: -40
    },
    cmText: {
        fontSize: 30,
        color: '#B2B2B2',
    },
    scrollWrapper: {
        height: 400,
        width: 100,
        backgroundColor: '#9A75FF',
        borderRadius: 30,
        alignItems: 'center',
        position: 'relative',
        padding: 10
    },
    scaleItem: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scaleNumber: {
        fontSize: 30,
        color: '#B2B2B2',
    },
    highlightedScaleNumber: {
        fontWeight: 'bold',
        color: 'white',
    },
    lineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalLine: {
        width: 50,
        height: 2,
        backgroundColor: 'white',
        marginTop: 10
    },
    sverticalLine: {
        width: 20,
        height: 2,
        backgroundColor: 'white',
        marginTop: 10
    },
    triangle: {
        width: 0,
        height: 0,
        borderTopWidth: 20,     // Add top border
        borderBottomWidth: 20,  // Add bottom border
        borderLeftWidth: 20,    // Create the triangle pointing left
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#E2F163', // Color for the triangle
        borderRightColor: 'transparent', // Make the right side transparent
        marginTop: 40,
        marginBottom: 20,
        position: 'absolute',
        left: 100,
        top: 237
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 60,
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#383838'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HeightPage;
