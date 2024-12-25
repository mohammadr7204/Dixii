import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert, PanResponder, Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import styles from './stats.styles';
import { COLORS, SIZES, FONT, icons } from "../../../constants";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../../amplify/data/resource";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = generateClient<Schema>() // use this Data client for CRUDL requests

interface Dataset{
    stressArray: [number,string][];
    focusArray: [number,string][];
    
    focusTime: [number,string][];
    badgesArray: boolean[];
    xp: number;

}
const Stats = () => {
    //const [userData, setUserData] = useState<Schema["Data"]["type"]>();
    const [changeFocus, setChangeFocus] = useState<string>('');
    const [changeStress, setChangeStress] = useState<string>('');
    const [avgDeepwork, setAvgDeepwork] = useState<string>('');
    const data = useRef<Dataset>();
    async function getData() {


        try {
            const jsonData = await AsyncStorage.getItem('data');
            data.current = (JSON.parse(jsonData));

            // const userAttributes = await fetchUserAttributes();
            // const id = userAttributes.email;
            // if (id) {
            //     const { data: td } = await client.models.Users.get({
            //         email: id
            //     });
            //     const { data: members } = await td.data();
            //     setUserData(members);

            
        } catch (error) {
            console.error(error);
        }

    }
    
    const getFocusIncrease = () => {
        const today = new Date();
        const lastWeek1 = new Date(today);
        const lastWeek2 = new Date(today);
        const today2 = new Date(today);
        lastWeek1.setDate(today.getDate() - 6);
        lastWeek2.setDate(today.getDate() - 8);
        today2.setDate(today.getDate()-2);
        const lastWeek1ISO = lastWeek1.toISOString().split('T')[0];
        const lastWeek2ISO = lastWeek2.toISOString().split('T')[0];
        const today2ISO = today2.toISOString().split('T')[0];
        const todayISO = today.toISOString().split('T')[0];
        let lastWeekCount = 1;
        let lastWeekStressTotal = 1;
        let lastWeekFocusTotal = 1;
        let thisWeekCount = 1;
        let thisWeekStressTotal = 1;
        let thisWeekFocusTotal = 1;
        if (!data){
            setChangeFocus('-');
            setChangeStress('-');
            setAvgDeepwork('-');
            return;
        }
        for (var i = 0; i < data.current.stressArray.length; i++) {
            if ((data.current.stressArray[i][1] >= lastWeek2ISO) && (data.current.stressArray[i][1] <= lastWeek1ISO)){
                lastWeekCount++;
                lastWeekStressTotal += data.current.stressArray[i][0];
                lastWeekFocusTotal += data.current.focusArray[i][0];
            }
            else if ((data.current.stressArray[i][1] >= today2ISO ) && (data.current.stressArray[i][1] <= todayISO)){
                thisWeekCount++;
                thisWeekStressTotal += data.current.stressArray[i][0];
                thisWeekFocusTotal += data.current.focusArray[i][0];
            }
        }
        
        if (lastWeekStressTotal == 0 || lastWeekCount == 0 || thisWeekStressTotal == 0 || lastWeekFocusTotal == 0 || thisWeekFocusTotal == 0 || thisWeekCount == 0){
            setChangeFocus('-');
            setChangeStress('-');
            setAvgDeepwork('-');
            return;
        }
        
        lastWeekStressTotal /= lastWeekCount
        lastWeekFocusTotal /= lastWeekCount
        thisWeekStressTotal /= thisWeekCount
        thisWeekFocusTotal /= thisWeekCount

        console.log(thisWeekStressTotal/lastWeekStressTotal);
        


        setChangeFocus(Math.floor(thisWeekFocusTotal/lastWeekFocusTotal * 100).toString())
        setChangeStress(Math.floor(thisWeekStressTotal/lastWeekStressTotal * 100).toString())



    }
    
    const getAverageDeepwork = () => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const lastWeekISO = lastWeek.toISOString();
        const todayISO = today.toISOString();
        let num = 0;
        let total = 0;
        if (!data){
            return;
        
        }
        for (var i = 0; i < data.current.focusTime.length; i++){
            
            if ((data.current.focusTime[i][1] > lastWeekISO)){
                
                total += data.current.focusTime[i][0];
                num++;
            }
        }
        
        let avg = total/num;
        console.log(num);
        console.log(avg)
        let hours = Math.floor(avg/60)
        let min = total % 60

        setAvgDeepwork(hours.toString() + "h  " + min.toString() + "m")
    }
    useEffect(() => {
        const thisEffect = async () => {
            await getData();
            getFocusIncrease();
            getAverageDeepwork();
        }
        thisEffect();
        
    
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.statContainer}>
                <View style={styles.stat}>
                    <View style={styles.percentContainer}>
                        <Image
                            source={icons.upArrow}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                        <Text style={styles.percentage}>
                            {changeFocus}%
                        </Text>
                    </View>
                    <Text style={styles.statText}>
                        Increase In Focus Over the Past 7 Days
                    </Text>
                </View>
                <View style={styles.stat}>
                    <View style={styles.percentContainer}>
                        <Image
                            source={icons.downArrow}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                        <Text style={styles.percentage}>
                            {changeStress}%
                        </Text>
                    </View>
                    <Text style={styles.statText}>
                        Decrease In Stress Over the Past 7 Days
                    </Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <View style={styles.clockContainer}>
                    <Image
                        source={icons.clock}
                        resizeMode='contain'
                        style={styles.clock}
                    />
                    <Text style={styles.percentage}>
                        {avgDeepwork}
                    </Text>

                </View>
                <Text style={styles.clockText}>
                    Average Deepwork Session
                </Text>
            </View>
        </View>
    )
    
}
export default Stats