import React, { useState, useEffect, useRef } from "react";
import { Image, TouchableOpacity, View, Text, Dimensions } from "react-native";
import styles from "./timer.style";
import { icons } from "../../../constants";
import Dashboard from "../../home/dashboard/dashboard";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { format, getDate } from "date-fns";
import { fetchUserAttributes } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StressModal from "./stressModal";
import FocusModal from "./focusModal";

const client = generateClient<Schema>();

const Timer = ({ isTodo, showTodo, averageAttention, averageStress, minuteAttention, minuteStress }) => {
  
  const [vals, setVals] = useState({ todos: [] });
  const [str, setStr] = useState<string>("");
  const [str2, setStr2] = useState<string>("");
  const [str3, setStr3] = useState<string>("");
  const TodoItem = (obj) => {
    console.log(obj);
    const [isChecked, setIsChecked] = useState<boolean>(obj.completed);
    async function deleteTodo() {
      try {
        var temp = vals;
        let index = -1;
        let todos = temp.todos
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i
          }
        }
        temp.todos.splice(index, 1);



        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem('todo', jsonvalue);
        getData();
        setTodos({});
        setShowingTodo(false);

        
      } catch (error) {
        console.error(error);
      }
    }

    async function handleCheck() {
      if (isChecked) {
        setIsChecked(false);
        var temp = vals;
        let index = -1;
        let todos = temp.todos
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i
          }
        }
        temp.todos[index].completed = false
        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem('todo', jsonvalue);

      } else {
        var temp = vals;
        let index = -1;
        let todos = temp.todos
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i
          }
        }
        temp.todos[index].completed = true
        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem('todo', jsonvalue);
        setIsChecked(true);
      }
    }

    return (
      <View
        style={{
          marginTop: 16,
          backgroundColor: COLORS.gray3,
          borderRadius: 12,
          width: Dimensions.get("window").width - 64,
        }}
      >
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={handleCheck}>
            <View style={styles.checkbox}>
              {isChecked && <View style={styles.checkboxTick} />}
            </View>
          </TouchableOpacity>
          <Text
            style={{
              ...styles.todoText,
              color: obj.completed ? COLORS.gray2 : "white",
            }}
          >
            {obj.task}
          </Text>
          <TouchableOpacity onPress={deleteTodo}>
            <Image
              style={styles.trashIcon}
              resizeMode="contain"
              source={icons.trash}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>
          {str} {" "}

          {str2} - {str3}
        </Text>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            Remaining: {formatTime(countdownTime)}
          </Text>
        </View>
      </View>
    );
  };

  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todos, setTodos] = useState({});
  const [breakModalVisible, setBreakModalVisible] = useState<boolean>(false);
  const [showingTodo, setShowingTodo] = useState<boolean>(false)
  const [showIsTodo, setShowingIsTodo] = useState<number>(-1);

  const [stressModalVisible, setStressModalVisible] = useState<boolean>(false);
  const [focusModalVisible, setFocusModalVisible] = useState<boolean>(false);
  const [chooseTask, setChooseTask] = useState<boolean>(true);
  const [startTask, setStartTask] = useState<boolean>(false);
  const [needRest, setNeedRest] = useState<boolean>(false);
  const [userData, setUserData] = useState<Schema["Data"]["type"]>();
  const [countdownTime, setCountdownTime] = useState<number>(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  async function getData() {
    if (isTodo) {
      setShowingTodo(true);
      const jsonvalue = await AsyncStorage.getItem('todo');


      let value = null
      if (jsonvalue) {
        value = JSON.parse(jsonvalue);
      }
      if (value == null) {
        value = { todos: [] }
      }
      let arr = value.todos;
      setVals(value);
      let index = -1
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == isTodo) {
          index = i;
        }
      }
      let todo = arr[index];



      if (todo) {
        setTodos(todo);
        const allocatedSeconds = todo.allocated * 60;
        setCountdownTime(allocatedSeconds);
        setStr(format(new Date(todo.date), "MM/dd/yy"))
        setStr2(format(todo.start, "h:mma"))
        setStr3(format(todo.end, "h:mma"));
      }
    }
  }

  useEffect(() => {
    getData();
  }, [isTodo]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (minuteStress > 70 && running) {
      setStressModalVisible(true);
    }
  }, [minuteStress]);

  useEffect(() => {
    if (minuteAttention > 70 && running) {
      setFocusModalVisible(true);
    }
  }, [minuteAttention]);

  useEffect(() => {
    if (countdownTime === 0 && countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  }, [countdownTime]);

  const startStopwatch = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopStopwatch = () => {
    if (running) {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetStopwatch = () => {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
  };

  const startCountdown = () => {
    if (countdownTime > 0) {
      countdownRef.current = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  const stopCountdown = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  async function updateTime() {
    const minutes = Math.floor(time / 60);
    console.log(minutes);
    try {
      const userAttributes = await fetchUserAttributes();
      const id = userAttributes.email;
      const today = new Date();

      if (id) {
        const { data: td } = await client.models.Users.get({
          email: id,
        });
        const { data: members } = await td.data();
        setUserData(members);
        let arr = members.focusTime;
        const today = new Date();
        const isoDate = today.toISOString().split("T")[0];
        let arr2 = members.focusTimeArray;
        arr2.push(isoDate);
        arr.push(minutes);
        await client.models.Data.update({
          id: members.id,
          focusTime: arr,
          focusTimeArray: arr2

        });
        const jsonVal = await AsyncStorage.getItem("data");
        let val = JSON.parse(jsonVal);

        val.focusTime.push([minutes, isoDate]);

        const finalVal = JSON.stringify(val);
        await AsyncStorage.setItem("data", finalVal);



      }
    } catch (error) {
      console.error(error);
    }
  }

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Image style={styles.icon} source={icons.timer} resizeMode="contain" />
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {time === 0 && !running ? (
          <TouchableOpacity
            style={styles.primaryButtons}
            onPress={() => {
              setStartTask(true);
              if (showTodo) {
                startStopwatch();
                startCountdown();
              }
            }}
          >
            <Text style={styles.buttonText}>Start Deepwork</Text>
          </TouchableOpacity>
        ) : (
          <>
            {running ? (
              <TouchableOpacity
                style={styles.grayButtons}
                onPress={stopStopwatch}
              >
                <Text style={styles.buttonText}>Take a Break</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.grayButtons}
                onPress={() => {
                  setStartTask(true);
                  if (showTodo) {
                    startStopwatch();
                    startCountdown();
                  }
                }}
              >
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.primaryButtons}
              onPress={() => {
                resetStopwatch();
                updateTime();
                stopCountdown();
              }}
            >
              <Text style={styles.buttonText}>Stop Deepwork</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {showingTodo && todos && <TodoItem {...todos} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.dashboardText}>Live Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() =>
            router.push({
              pathname: "todo",
              params: { isChooseTask: 1 },
            })
          }
        >
          <Text style={styles.dashboardText}>Choose a Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsContainer}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.vitalsText}>+20 xp</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Image
            style={styles.stressIcon}
            source={icons.arrow}
            resizeMode="contain"
          />
          <Text style={styles.vitalsText}>Stress</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Image
            style={styles.focusIcon}
            source={icons.arrow}
            resizeMode="contain"
          />
          <Text style={styles.vitalsText}>Focus</Text>
        </View>
      </View>
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
            setChooseTask(false);
            setNeedRest(false);
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <Dashboard
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <StressModal
        isVisible={stressModalVisible}
        onClose={() => setStressModalVisible(false)}
      />
      <FocusModal
        isVisible={focusModalVisible}
        onClose={() => setFocusModalVisible(false)}
      />
      <Modal isVisible={startTask && !showTodo}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => {
            setStartTask(false);
          }}
        >
          <View style={styles.stressModal}>
            <Image
              style={styles.brainIcon}
              source={icons.brain}
              resizeMode="contain"
            />
            <Text style={styles.stressText}>No Task Selected</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  ...styles.modalSecondaryButtons,
                  backgroundColor: COLORS.gray,
                }}
                onPress={() => {
                  setStartTask(false);
                  startStopwatch();
                  startCountdown();
                }}
              >
                <Text style={styles.buttonText}>No, thanks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSecondaryButtons}
                onPress={() => {
                  setStartTask(false);
                  router.push({
                    pathname: "todo",
                    params: { isChooseTask: 1 },
                  });
                  startStopwatch();
                  startCountdown();
                }}
              >
                <Text style={styles.buttonText}> Choose a Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Timer;
