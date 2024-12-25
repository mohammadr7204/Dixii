import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert, PanResponder } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import styles from './trends.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { time } from 'console';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = generateClient<Schema>();
interface Dataset {
    data: number[];
    color: (opacity?: number) => string;
    strokeWidth: number;
  }
  
  interface GraphValues {
    labels: string[];
    datasets: Dataset[];
  }
const Trends = () => {
    const [dateArray, setDateArray] = useState([true, ...Array(4).fill(false)]);
    const [selectedGraph, setSelectedGraph] = useState<string>('');
    const [tooltip, setTooltip] = useState(null);
    const chartRef = useRef(null);
    let [graphValues, setGraphValues] = useState<GraphValues>({
        labels: [],
        datasets: [
          {
            data: [],
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Example color function
            strokeWidth: 2,
          }
        ]
      });
    //const [userData, setUserData] = useState<Schema["Data"]["type"]>();
    let attentionScores = useRef<number[]>([]);
    let stressScores = useRef<number[]>([]);

    const toggleValue = (index) => {
        const newArray = [...dateArray];
        newArray.fill(false);
        newArray[index] = true;
        setDateArray(newArray);
    }

    const notCompleted = (text) => (
        <View style={styles.alternateSwitch}>
            <Text style={styles.alternateText}>{text}</Text>
        </View>
    );

    const yesCompleted = (text) => (
        <View style={styles.switch}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
    React.useEffect(() => {
        const fetchDataAndGraphValues = async () =>{
        await getData();
        getGraphValues();
        }
        fetchDataAndGraphValues();
    }, []);
    
    React.useEffect(() => {
        const fetchDataAndGraphValues = async () =>{
            await getData();
            getGraphValues();
            }
            fetchDataAndGraphValues();
    }, [dateArray]); // Add dateArray as a dependency to run getData only when dateArray changes

    async function getData() {
        try {
            
            const jsonData = await AsyncStorage.getItem('data');
            const data = JSON.parse(jsonData);

            if (!data || data.stressArray.length <= 0) {
                attentionScores.current = [1, 2, 3, 4, 5];
                stressScores.current = [1, 2, 3, 4, 5];
                return;
            }

            

            const today = new Date()
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate()-1)
            const yesterdayISO = yesterday.toISOString().split('T')[0];
            const todayISO = today.toISOString().split('T')[0];
            

            if (dateArray[0]) {
                attentionScores.current = [];
                stressScores.current = [];
                let count = 0;
                for (let i = data.stressArray.length - 1; i >= 0; i--) {
                    
                    if (data.stressArray[i][1] === yesterdayISO) {
                        if (count == 3){
                        attentionScores.current = [...attentionScores.current, data.focusArray[i][0]];
                        stressScores.current = [...stressScores.current, data.stressArray[i][0]];
                        count = 0
                        }
                        count++;
                    }
                }

                if (attentionScores.current.length === 0) {
                    attentionScores.current = [1, 2, 3, 4, 5];
                    stressScores.current = [1, 2, 3, 4, 5];
                }
            }
            else if (dateArray[1]) {
                attentionScores.current = [];
                stressScores.current = [];
                const today = new Date();
                const lastWeek = new Date(today);

                lastWeek.setDate(today.getDate() - 7);
                const lastWeekISO = lastWeek.toISOString().split('T')[0];
                const todayISO = today.toISOString().split('T')[0];
                let count = 0;
                for (let i = data.stressArray.length - 1; i >= 0; i--) {
                    if (data.stressArray[i][1] <= todayISO && data.stressArray[i][1]  >= lastWeekISO) {
                        
                        if (count == 3){
                            attentionScores.current = [...attentionScores.current, data.focusArray[i][0]];
                            stressScores.current = [...stressScores.current, data.stressArray[i][0]];
                        count = 0;
                        
                        }
                        
                        else count++;

                    }
                }
                
                if (attentionScores.current.length === 0) {
                    attentionScores.current = [1, 2, 3, 4, 5];
                    stressScores.current = [1, 2, 3, 4, 5];
                }
            }
            else if (dateArray[2]) {
                attentionScores.current = [];
                stressScores.current = [];
                const today = new Date();
                const lastMonth = new Date(today);

                lastMonth.setDate(today.getDate() - 30);
                const lastMonthISO = lastMonth.toISOString().split('T')[0];
                const todayISO = today.toISOString().split('T')[0];
                let count = 0;
                for (let i = data.stressArray.length - 1; i >= 0; i--) {
                    if (data.stressArray[i][1] <= todayISO && data.stressArray[i][1]  >= lastMonthISO) {
                        
                        if (count == 10){
                            attentionScores.current = [...attentionScores.current, data.focusArray[i][0]];
                            stressScores.current = [...stressScores.current, data.stressArray[i][0]];
                        count = 0;
                        
                        }
                        
                        else count++;

                    }
                }
                
                if (attentionScores.current.length === 0) {
                    attentionScores.current = [1, 2, 3, 4, 5];
                    stressScores.current = [1, 2, 3, 4, 5];
                }
            }
            

            // ... (Handle other cases for week, month, etc.)

            
            
        } catch (error) {
            console.error(error);
        }
    }

    // Call getData to fetch the scores when the component mounts
    
    
    const getGraphValues = () => {
        
        const data = {
            labels: [],
            datasets: [
                {
                    data: attentionScores.current, // Use attentionScores array
                    color: (opacity = 1) => COLORS.green,
                    strokeWidth: 2,
                },
                {
                    data: stressScores.current, // Use stressScores array
                    color: (opacity = 1) => COLORS.yellow, // Blue line 
                    strokeWidth: 2,
                }
            ]
        };
        
        setGraphValues(data);
        
    }
    
   
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>
                Analytics
            </Text>

            <View style={styles.barContainer}>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => toggleValue(0)}>
                    {dateArray[0] ? yesCompleted("Day") : notCompleted("Day")}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => toggleValue(1)}>
                    {dateArray[1] ? yesCompleted("Week") : notCompleted("Week")}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => toggleValue(2)}>
                    {dateArray[2] ? yesCompleted("Month") : notCompleted("Month")}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => toggleValue(3)}>
                    {dateArray[3] ? yesCompleted("YTD") : notCompleted("YTD")}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => toggleValue(4)}>
                    {dateArray[4] ? yesCompleted("All-time") : notCompleted("All-time")}
                </TouchableOpacity>
            </View>
            {(graphValues.datasets[0].data.length > 0) && (
                <View>
                    <LineChart
                        ref={chartRef}
                        data={graphValues}
                        withDots={false}
                        width={Dimensions.get("window").width - 60}
                        height={200}
                        fromZero={true}
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: COLORS.tertiary,
                            backgroundGradientFrom: COLORS.tertiary,
                            backgroundGradientTo: COLORS.tertiary,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 12,
                                paddingVertical: 16,
                            },
                            propsForBackgroundLines: {
                                strokeDasharray: "",
                            },
                            propsForLabels: {
                                fontSize: SIZES.xSmall,
                                fontWeight: FONT.light,
                            },
                            fillShadowGradientFrom: COLORS.secondary,
                            fillShadowGradientTo: COLORS.tertiary
                        }}
                        style={{
                            flex: 1,
                            marginVertical: 20,
                            borderRadius: 12,
                            backgroundColor: COLORS.tertiary,
                            paddingVertical: 16,
                        }}
                        withHorizontalLines={false}  // Disables horizontal lines
  withVerticalLines={false} 
                    />
                </View>
            )}
        </View>
    );
}

export default Trends;
