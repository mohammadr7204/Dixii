import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, Animated, Easing } from 'react-native';
import styles from "./dashboard.style";
import { icons, COLORS } from "../../../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const rotation = useRef(new Animated.Value(0)).current;
    const [vectorDimensions, setVectorDimensions] = useState({ width: 0, height: 0 });
    const [currentDegree, setCurrentDegree] = useState(0);
    const [averageAttention, setAverageAttention] = useState<number>(0);
    const [averageStress, setAverageStress] = useState<number>(0);

    async function grabData(){
        const jsonval = await AsyncStorage.getItem("currAtt");
        const num = JSON.parse(jsonval);
        setAverageAttention(num);
        const strJson = await AsyncStorage.getItem("currStr");
        const str = JSON.parse(strJson);
        setAverageStress(str);

    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            grabData();
        }, 1000); // 1000ms = 1 second
    
        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []); // Empty dependency array to run only once
    useEffect(() => {
        const calculateDegree = (score) => {
            // Map score from 0-100 to 180-0 degrees
            return -90 + (score * 1.8);
        };

        const newDegree = (calculateDegree(averageAttention) + calculateDegree(averageStress)) / 2;
        setCurrentDegree(newDegree);

        Animated.timing(rotation, {
            toValue: newDegree,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();

    }, [averageAttention, averageStress]);

    const rotate = rotation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    });

    const handleLayout = event => {
        const { width, height } = event.nativeEvent.layout;
        setVectorDimensions({ width, height });
    };

    const pivotX = 0;
    const pivotY = -20;

    const getColorBasedOnDegree = (degree) => {
        if (degree >= -90 && degree < -30) {
            return "#FD5D5D";
        } else if (degree >= -30 && degree < 35) {
            return "#FFE07C";
        } else if (degree >= 35 && degree <= 90) {
            return "#2DC672";
        }
        return 'white';
    };

    const getTextColorBasedOnDegree = (degree) => {
        if (degree >= -90 && degree < -30) {
            return "#F0F0F0";
        } else if (degree >= -30 && degree < 35) {
            return "#424242";
        } else if (degree >= 35 && degree <= 90){
            return "#F0F0F0";
        }
    }

    const getFocusBasedOnDegree = (degree) => {
        if (degree >= -90 && degree < -30) {
            return "Highly \n Distracted";
        } else if (degree >= -30 && degree < 35) {
            return "Somewhat \n Distracted";
        } else if (degree >= 35 && degree <= 90){
            return "Highly \n Focused";
        }

        return 'white';
    };

    const getStressBasedOnDegree = (degree) => {
        if (degree >= -90 && degree < -30) {
            return "Very \n Stressed";
        } else if (degree >= -30 && degree < 35) {
            return "Somewhat \n Stressed";
        } else if (degree >= 35 && degree <= 90){
            return "Very \n Relaxed";
        }

        return 'white';
    };

    const labelColor = getColorBasedOnDegree(currentDegree);
    const currentFocus = getFocusBasedOnDegree(currentDegree);
    const currentStress = getStressBasedOnDegree(currentDegree);
    const stringColor = getTextColorBasedOnDegree(currentDegree);

    return (
        <View style={styles.dashboardContainer}>
            <Text style={styles.dashboardHeader}>Live Dashboard</Text> 
            <View style={styles.dashboardSubContainer}> 
                <View style={styles.dashboardGraphContainer}>
                    <Image 
                        source={icons.pie}
                        resizeMode="contain"
                        style={styles.pie}
                    />
                    <Animated.Image
                        source={icons.vector}
                        resizeMode="contain"
                        style={[
                            styles.vector,
                            { 
                                transform: [
                                    { translateX: -pivotX },
                                    { translateY: -pivotY },
                                    { rotate },
                                    { translateX: pivotX },
                                    { translateY: pivotY }
                                ]
                            }
                        ]}
                        onLayout={handleLayout}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.labelText}>Distracted</Text>
                        <Text style={{...styles.labelText, paddingLeft: 55 }}>Focused</Text>
                    </View>
                </View>
                <View style={styles.dashboardTextContainer}>
                    <Text style={styles.textHeader}>Focus Score</Text>
                    <View style={{...styles.labelContainer, backgroundColor: labelColor}}> 
                        <Text style={{...styles.descriptionText, color: stringColor }}> {currentFocus} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.dashboardSubContainer}> 
                <View style={styles.dashboardGraphContainer}>
                    <Image 
                        source={icons.pie}
                        resizeMode="contain"
                        style={styles.pie}
                    />
                    <Animated.Image
                        source={icons.vector}
                        resizeMode="contain"
                        style={[
                            styles.vector,
                            { 
                                transform: [
                                    { translateX: -pivotX },
                                    { translateY: -pivotY },
                                    { rotate },
                                    { translateX: pivotX },
                                    { translateY: pivotY }
                                ]
                            }
                        ]}
                        onLayout={handleLayout}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.labelText}>Stressed</Text>
                        <Text style={{...styles.labelText, paddingLeft: 65 }}>Relaxed</Text>
                    </View>
                </View>
                <View style={styles.dashboardTextContainer}>
                    <Text style={styles.textHeader}>Stress Score</Text>
                    <View style={{...styles.labelContainer, backgroundColor: labelColor}}> 
                        <Text style={{...styles.descriptionText, color: stringColor}}> {currentStress}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.updateText}>Updates every 15 seconds.</Text>
        </View>
    );
};

export default Dashboard;
