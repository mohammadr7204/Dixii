import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacityComponent,
} from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import styles from "./badgeList.styles";
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from "../../../constants";
import { images } from "../../../constants";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { validateNumber } from "aws-cdk-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = generateClient<Schema>();
interface Dataset {
    stressArray: [number, string][];
    focusArray: [number, string][];

    focusTime: [number, string][];
    badgesArray: boolean[];
    xp: number;

}
interface Subtask {
    task: string;
    completed: boolean;
    subtaskId: number;
}

interface Todo {
    task: string;
    date: string;
    start: string;
    end: string;
    allocated: number;
    id: number;
    subtaskNum: number;
    completed: boolean;
    subtasks: Subtask[];
}

interface Todos {
    todos: Todo[];
}
const BadgeList = () => {
    const [userData, setUserData] = useState<Schema["Data"]["type"]>();
    const [validBadges, setValidBadges] = useState<boolean[]>([false, false, false, false, false]);
    const [icons, setIcons] = useState<string[]>([]);
    //const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
    const data = useRef<Dataset>();
    const todoRef = useRef<Todos>();
    async function getData() {
        try {
            const userAttributes = await fetchUserAttributes();
            const id = userAttributes.email;
            if (id) {
                const { data: td } = await client.models.Users.get({
                    email: id
                });
                const { data: members } = await td.data();
                const { data: list } = await td.todo();
                setUserData(members);
                setTodos(list);
                const jsonVal = await AsyncStorage.getItem("data");
                data.current = JSON.parse(jsonVal);
                const todoVal = await AsyncStorage.getItem("todo");
                todoRef.current = JSON.parse(todoVal);


            }
        } catch (error) {
            console.error(error);
        }
    }

    async function calcBadges() {
        if (data.current.badgesArray[0]) {
            validBadges[0] = true
        }
        else {
            let total = 0;
            for (var i = 0; i < data.current.focusTime.length; i++) {
                total += data.current.focusTime[i][0]
                if (total > (120 * 60)) {
                    validBadges[0] = true
                    return

                }
            }
        }
        if (data.current.badgesArray[1]) {
            validBadges[1] = true
        }
        else {
            var count = 0;
            for (var i = 0; i < todoRef.current.todos.length; i++) {
                if (todoRef.current.todos[i].completed == true) {
                    count++;
                }
            }
            if (count >= 5) {
                validBadges[1] = true
            }

        }
        if (data.current.badgesArray[2]) {
            validBadges[2] = true;
        }
        else {
            var count = 0;
            for (var i = 0; i < data.current.focusTime.length; i++) {
                count += data.current.focusTime[i][0];

            }
            if (count > 36000) {
                validBadges[2] = true
            }
        }
        if (data.current.badgesArray[3]) {
            validBadges[3] = true
        }
        else {
            // var count = 0;
            // var streak = false;
            // for (var i = 0; i < userData.daysActive.length -1; i++){
            //     const today = userData.daysActive[i];
            //     today.setDate(today.getDate()+1);
            //     if (userData.daysActive[i+1] == today ){
            //         count++;
            //         if (count = 5){
            //             streak = true;
            //             break;
            //         }
            //     }
            //     else{
            //         count = 0;
            //     }
        
        // if (streak){
        //     validBadges[3] = true
        // }

    }
    if (userData.badgesArray[4]) {
        validBadges[4] = true
    }
    else {
        if (userData.xp > 5000) {
            validBadges[4] = true
        }

    }
    const { data: td } = await client.models.Data.update({
        id: userData.id,
        badgesArray: validBadges


    })

    
}
useEffect(() => {
    getData();
    calcBadges();

}, []);

return (
    <View style={styles.container}>
        <View style={styles.rowContainer}>
            {validBadges[0] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.crownBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Royally Focused
                    </Text>
                    <Text style={styles.text}>
                        Deepwork Session Lasted Two Hours
                    </Text>
                </View>
            )}
            {validBadges[0] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.noBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Royally Focused
                    </Text>
                    <Text style={styles.text}>
                        Deepwork Session Lasted Two Hours
                    </Text>
                </View>
            )}
            <View style={styles.badgeContainer}>
                <Image
                    source={images.brainBadge}
                    resizeMode='contain'
                    style={styles.icon}
                />
                <Text style={styles.header}>
                    Braniac
                </Text>
                <Text style={styles.text}>
                    Completed 5 To-Do Tasks
                </Text>
            </View>

        </View>
        <View style={styles.rowContainer}>
            {validBadges[2] && (


                <View style={styles.badgeContainer}>

                    <Image
                        source={images.bookBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Bookworm
                    </Text>
                    <Text style={styles.text}>
                        Studied for 10 Hours in a Week
                    </Text>
                </View>
            )}
            {!validBadges[2] && (


                <View style={styles.badgeContainer}>

                    <Image
                        source={images.noBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Bookworm
                    </Text>
                    <Text style={styles.text}>
                        Studied for 10 Hours in a Week
                    </Text>
                </View>
            )}
            {validBadges[3] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.starBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Rockstar
                    </Text>
                    <Text style={styles.text}>
                        Used Deepwork For 5 Days Straight
                    </Text>
                </View>
            )}
            {!validBadges[3] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.noBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Rockstar
                    </Text>
                    <Text style={styles.text}>
                        Used Deepwork For 5 Days Straight
                    </Text>
                </View>
            )}
        </View>

        <View style={styles.rowContainer}>
            {validBadges[4] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.friendBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Popular
                    </Text>
                    <Text style={styles.text}>
                        Gained Over 5000 XP
                    </Text>
                </View>
            )}
            {!validBadges[4] && (
                <View style={styles.badgeContainer}>
                    <Image
                        source={images.noBadge}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.header}>
                        Popular
                    </Text>
                    <Text style={styles.text}>
                        Gained Over 5000 XP
                    </Text>
                </View>
            )}

            <View style={styles.badgeContainer}>
                <Image
                    source={images.noBadge}
                    resizeMode='contain'
                    style={styles.icon}
                />
                <Text style={styles.header}>
                    Locked
                </Text>
                <Text style={styles.text}>
                    Use Deepwork for 30 Days to Unlock
                </Text>
            </View>


        </View>
    </View>
);
};
export default BadgeList;
