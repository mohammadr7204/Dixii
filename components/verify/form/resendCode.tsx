import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import styles from '../../forgotPassword/message/message.style';

const ResendCode = () => {
    const [time, setTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null >(null);
    const [running, setRunning] = useState<boolean> (false);
    useEffect(() => {
        return () => { if (timerRef.current) clearInterval(timerRef.current);}
    }, []);
    const startStopwatch = () => {
        if (!running) {
            setRunning(true);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
    };
    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);


        return `${getSeconds}`;
    };
    const resetStopwatch = () => {
        setRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
        setTime(0);
    };
    return (
        <View>

        </View> 
    )
}
export default ResendCode;