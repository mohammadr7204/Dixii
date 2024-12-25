import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { Stack, useRouter, Link, useLocalSearchParams } from "expo-router";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { COLORS, SIZES, icons, images } from "../constants";
import HomeHeaderLeft from "../components/home/header/HomeHeaderLeft";
import HomeHeaderRight from "../components/home/header/HomeHeaderRight";
import Timer from "../components/home/timer/timer";
import GlobalStyles from "../components/globalStyle";
import Navbar from "../components/common/navbar/navbar";
import LottieView from "lottie-react-native";
import Dashboard from "../components/home/dashboard/dashboard";
import Modal from "react-native-modal";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import UseBLE from "../components/bluetooth/useBLE";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import animationData from '../assets/animations/shapes.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { a } from "@aws-amplify/backend";

const client = generateClient<Schema>();
const BACKGROUND_TASK_NAME = "data-collection-task";

const Home: React.FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Schema["Todo"]["type"]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isTodo } = useLocalSearchParams();
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const [bleData, setBleData] = useState<string>("");
  const [attentionScores, setAttentionScores] = useState<number[]>([]);
  const [stressScores, setStressScores] = useState<number[]>([]);
  const [averageAttention, setAverageAttention] = useState<number>(0);
  const [averageStress, setAverageStress] = useState<number>(0);
  const [minuteAttentionScores, setMinuteAttentionScores] = useState<number[]>(
    []
  );
  const [minuteStressScores, setMinuteStressScores] = useState<number[]>([]);
  const [minuteTimeScores, setMinuteTimeScores] = useState<Date[]>([]);

  const [averageMinuteAttention, setAverageMinuteAttention] =
    useState<number>(0);
  const [averageMinuteStress, setAverageMinuteStress] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<Schema["Data"]["type"]>();
  
  async function getEmail() {
    try {
      const userAttributes = await fetchUserAttributes();
      const id = userAttributes.email;
      if (id) {
        const { data: td } = await client.models.Users.get({
          email: id,
        });

        const { data: members } = await td.data();
        setEmail(td.email);
        setUserData(members);
        //await AsyncStorage.removeItem('data');
        const jsonEmail = await AsyncStorage.getItem("email");
        
       
        const jsonData = await AsyncStorage.getItem("data")
        const data = JSON.parse(jsonData);
        
        if (email != jsonEmail || data == null) {
          const allData = {
            stressArray: members.stressArray.map((item,index) => [item, members.timeArray[index]]),
            focusArray: members.focusArray.map((item,index) => [item, members.timeArray[index]]), 
            badgesArray: members.badgesArray,
            focusTime: members.focusTime.map((item,index)=> [item, members.focusTimeArray]),
            xp: members.xp,
      }
        
      
        let datatoJson = JSON.stringify(allData)
        await AsyncStorage.setItem('data', datatoJson);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateData(att, str) {
    try {
      let minuteAttentionScores = userData.focusArray;
      let minuteStressScores = userData.stressArray;
      let minuteTimeScores = userData.timeArray;
      const today = new Date();
      const isoDate = today.toISOString().split("T")[0];

      minuteAttentionScores.push(att);
      minuteStressScores.push(str);
      minuteTimeScores.push(isoDate);
      

      await client.models.Data.update({
        id: userData.id, // Make sure userData is defined
        stressArray: minuteStressScores,
        focusArray: minuteAttentionScores,
        timeArray: minuteTimeScores,
      });

      const jsonval = await AsyncStorage.getItem('data');
      let val = JSON.parse(jsonval);

      val.stressArray.push([str, isoDate]);
      val.focusArray.push([att, isoDate]);

      const finalVal = JSON.stringify(val);
      await AsyncStorage.setItem("data",finalVal);
    } catch (error) {
      console.error("Failed to write data point:", error);
    }

  }
  async function updateCurrData(avgAtt, avgStr){
    await AsyncStorage.setItem("currAtt", avgAtt);
    await AsyncStorage.setItem("currStr", avgStr);
  }

  useEffect(() => {
    if (isTodo) {
      setShowTodo(true);
    }
    const timer = setTimeout(() => {
      getEmail();
    }, 10000); // 10 seconds

    // Clean up the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [isTodo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttentionScores((prevAttentionScores) => {
        setStressScores((prevStressScores) => {
          console.log("15-second interval triggered");
          

          if (prevAttentionScores.length > 0 && prevStressScores.length > 0) {
            const avgAttention = Math.round(
              prevAttentionScores.reduce((a, b) => a + b, 0) /
              prevAttentionScores.length
            );
            const avgStress = Math.round(
              prevStressScores.reduce((a, b) => a + b, 0) /
              prevStressScores.length
            );

           
            updateCurrData(avgAttention, avgStress)
            setAverageAttention(avgAttention);
            setAverageStress(avgStress);
          }

          // Return an empty array to reset the scores for the next interval
          return [];
        });

        return [];
      });
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userData) {
      const minuteInterval = setInterval(async () => {
        setMinuteAttentionScores((prevMinuteAttentionScores) => {
          setMinuteStressScores((prevMinuteStressScores) => {
            console.log("1-minute interval triggered");
            

            if (
              prevMinuteAttentionScores.length > 0 &&
              prevMinuteStressScores.length > 0
            ) {
              const avgMinuteAttention = Math.round(
                prevMinuteAttentionScores.reduce((a, b) => a + b, 0) /
                prevMinuteAttentionScores.length
              );
              const avgMinuteStress = Math.round(
                prevMinuteStressScores.reduce((a, b) => a + b, 0) /
                prevMinuteStressScores.length
              );

              

              setAverageMinuteAttention(avgMinuteAttention);
              setAverageMinuteStress(avgMinuteStress);
              updateData(avgMinuteAttention, avgMinuteStress);
              
            }

            // Return an empty array to reset the scores for the next interval
            return [];
          });

          return [];
        });
      }, 60000); // 1 minute

      return () => clearInterval(minuteInterval);
    }
  }, [userData]); // Only run this effect when userData changes

  const handleReceivedData = (data: string) => {
    // console.log("Data received from BLE:", data);

    // Parse the BLE data string into key-value pairs by line breaks
    const dataPairs = data
      .split("\n")
      .map((pair) => pair.split(":"))
      .filter(([key, value]) => key && key.trim() && value && value.trim());

    let attentionLeft = 0;
    let attentionRight = 0;
    let stressLeft = 0;
    let stressRight = 0;

    dataPairs.forEach(([key, value]) => {
      const numericValue = parseFloat(value.replace("%", "").trim());
      switch (key.trim()) {
        case "Attention_Left":
          attentionLeft = numericValue;
          break;
        case "Attention_Right":
          attentionRight = numericValue;
          break;
        case "Stress_Level_Left":
          stressLeft = numericValue;
          break;
        case "Stress_Level_Right":
          stressRight = numericValue;
          break;
        default:
          console.warn(`Unknown key received: ${key.trim()}`);
          break;
      }
    });

    const avgAttention = (attentionLeft + attentionRight) / 2;
    const avgStress = (stressLeft + stressRight) / 2;

    // console.log("Adding to attentionScores:", avgAttention);
    // console.log("Adding to stressScores:", avgStress);

    // Add the calculated averages to the tracking arrays
    setAttentionScores((prev) => [...prev, avgAttention]);
    setStressScores((prev) => [...prev, avgStress]);

    // Add to the minute tracking arrays
    setMinuteAttentionScores((prev) => [...prev, avgAttention]);
    setMinuteStressScores((prev) => [...prev, avgStress]);

    // Update the state for the current BLE data (for immediate display if needed)
    setBleData(
      `Attention: ${avgAttention.toFixed(2)}% | Stress: ${avgStress.toFixed(
        2
      )}%`
    );
  };

  const [lottieProgress, setLottieProgress] = useState<number>(0);
  const [animationDataWithColor, setAnimationDataWithColor] = useState(animationData);
  const animationRef = useRef<LottieView>(null);
  const animatedColorValue = useRef(new Animated.Value(0)).current;

  // Function to map focus score (0-100) to Lottie progress (0-0.5)
  const getLottieProgress = (focus: number) => {
    return (focus / 100) * 0.5;
  };

  // Function to interpolate color based on stress score
  const interpolateColor = (stress: number) => {
    const blue = [0, 122, 255];
    const purple = [128, 0, 128];
    const red = [255, 0, 0];

    if (stress <= 50) {
      // Interpolate between blue and purple
      const ratio = stress / 50;
      return blue.map((c, i) => Math.round(c + ratio * (purple[i] - c)));
    } else {
      // Interpolate between purple and red
      const ratio = (stress - 50) / 50;
      return purple.map((c, i) => Math.round(c + ratio * (red[i] - c)));
    }
  };

  useEffect(() => {
    const targetProgress = getLottieProgress(averageAttention);

    if (animationRef.current) {
      let animationFrame: number;

      const animate = () => {
        setLottieProgress((prev) => {
          const newProgress = prev + (targetProgress - prev) * 0.005;
          if (Math.abs(newProgress - targetProgress) < 0.001) {
            cancelAnimationFrame(animationFrame);
            return targetProgress; // Stop at the exact target
          }
          animationFrame = requestAnimationFrame(animate);
          return newProgress;
        });
      };

      animationFrame = requestAnimationFrame(animate);

      // Clean up the animation on unmount
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [averageAttention]);

  useEffect(() => {
    const [r, g, b] = interpolateColor(averageStress); // Interpolated RGB color based on stress score
    const updatedAnimationData = JSON.parse(JSON.stringify(animationData));

    // Function to update colors in a given layer
    const updateColorInLayer = (layer) => {
      if (layer.shapes) {
        layer.shapes.forEach((shape) => {
          if (shape.it) {
            shape.it.forEach((item) => {
              if (item.ty === 'fl') {
                item.c.k = [r / 255, g / 255, b / 255, 1];
              }
            });
          }
        });
      }
    };

    // Update colors in the main layers
    updatedAnimationData.layers.forEach(updateColorInLayer);

    // Update colors in assets (sub-compositions)
    if (updatedAnimationData.assets) {
      updatedAnimationData.assets.forEach((asset) => {
        if (asset.layers) {
          asset.layers.forEach(updateColorInLayer);
        }
      });
    }

    setAnimationDataWithColor(updatedAnimationData);
  }, [averageStress]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Stack.Screen
          options={{
            headerShown: false, // Hide the default header
            autoHideHomeIndicator: true,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              paddingHorizontal: 16,
              paddingTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <HomeHeaderLeft img={images.profile} />
            <HomeHeaderRight isChecked={true} />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.medium,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <LottieView
                ref={animationRef}
                source={animationDataWithColor}
                loop={false}
                progress={lottieProgress} // Use state for progress
                style={{
                  height: 300,
                  alignContent: "center",
                  transform: [{ scale: 1.0 }]
                }}
              />
            </TouchableOpacity>
            <Timer
              showTodo={showTodo}
              isTodo={isTodo}
              averageAttention={averageAttention}
              averageStress={averageStress}
              minuteAttention={averageMinuteAttention}
              minuteStress={averageMinuteStress}
            />
            <UseBLE onDataReceived={handleReceivedData} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar analytics={true} home={false} profile={true} />
      <Modal isVisible={modalVisible}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <Dashboard
              
              
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;
