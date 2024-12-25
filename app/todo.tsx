import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, FONT, SIZES, icons } from "../constants";
import styles from "../components/todo/list/list.style";
import GlobalStyles from "../components/globalStyle";
import { fetchUserAttributes } from "aws-amplify/auth";
import Header from "../components/todo/header/header";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GraphQLError } from "graphql";
import Modal from "react-native-modal";
import { format, differenceInMinutes } from "date-fns";
// import * as Notifications from 'expo-notifications';


const client = generateClient<Schema>(); // use this Data client for CRUDL requests

const Todo = () => {
  const router = useRouter();
  //const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [selectedTodo, setSelectedTodo] = useState<number>(null);
  const [vals, setVals] = useState({ todos: [] });
  const [subtasks, setSubtasks] = useState([]);
  const [completed, setCompleted] = useState<boolean>(true);
  const [isSubtask, setIsSubtask] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>("");
  const [subtaskTaskValue, setSubtaskTaskValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [isStartTimePickerVisible, setStartTimePickerVisible] =
    useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] =
    useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<GraphQLError>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [todos, setTodos] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { isChooseTask } = useLocalSearchParams();
  const ref = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (modalVisible && selectedTodo) {
      getSubtasks();
    }
  }, [modalVisible, selectedTodo]);

  async function addSubtask(subtaskText: string) {
    try {
      const newSubtask = {
        task: subtaskText,
        completed: false,
        subtaskId: vals.todos[selectedTodo].subtaskNum, // Associate subtask with the correct todoId
      };
      let temp = vals;

      temp.todos[selectedTodo].subtasks.push(newSubtask);
      temp.todos[selectedTodo].subtaskNum += 1;

      const newJsonVal = JSON.stringify(temp);
      await AsyncStorage.setItem("todo", newJsonVal);
      // const { data: createdSubtask } = await client.models.Subtask.create(newSubtask);
      // setSubtasks([...subtasks, createdSubtask]); // Update the local state to reflect the new subtask
      setSubtaskTaskValue(""); // Clear input field after submission
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  }

//   async function scheduleTaskNotification(taskName: string, startTime: Date) {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Task Reminder",
//         body: `Your task "${taskName}" is starting now!`,
//         sound: 'default',
//       },
//       trigger: {
//         date: startTime,  // Schedule the notification for the task's start time
//       },
//     });
  
//     console.log(`Notification scheduled for task: ${taskName} at ${startTime}`);
//   }

  async function addTask(
    text: string,
    dueDate: Date,
    startTime: Date,
    endTime: Date
  ) {
    try {
      const allocatedTime = differenceInMinutes(endTime, startTime);
      const jsonvalue = await AsyncStorage.getItem("todo");
  
      let value = null;
  
      if (jsonvalue) {
        value = JSON.parse(jsonvalue);
      }
      if (value == null) {
        value = { todos: [] };
      }
      let strsize = await AsyncStorage.getItem("len");
      let size = Number(strsize);
      if (size == null) {
        size = value.todos.length;
      }
  
      value.todos.push({
        task: text,
        date: dueDate.toISOString(),
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        allocated: allocatedTime,
        id: size,
        subtaskNum: 0,
        completed: false,
        subtasks: [],
      });
      size = size + 1;
      await AsyncStorage.setItem("len", size.toString());
      const newJsonVal = JSON.stringify(value);
      await AsyncStorage.setItem("todo", newJsonVal);
  
      // Schedule notification for the task
    //   scheduleTaskNotification(text, startTime);
  
      setTaskValue("");
      setDueDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date());
      setModalVisible(false);
      setShowTask(false);
      getData();
    } catch (error) {
      setErrors(error);
    }
  }

  const notCompleted = (text: string) => (
    <View style={styles.alternateSwitch}>
      <Text style={styles.alternateText}>{text}</Text>
    </View>
  );

  const yesCompleted = (text: string) => (
    <View style={styles.switch}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  const renderItem = ({ item }) => <TodoItem {...item} />;
  const renderSubtasks = ({ item }) => <SubtaskItem {...item} />;

  async function getSubtasks() {
    try {
      // const { data: td } = await client.models.Todo.get({
      //     id: todoId
      // });
      // const { data: members } = await td.subtask();
      // setSubtasks(members); // Now subtasks are correctly loaded for each todo

      setSubtasks((prev) => todos[selectedTodo].subtasks);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (subtasks !== null) {
      const doSomething = async () => {
        setTrigger((prev) => !prev);
        // Continue with other logic here
      };

      doSomething();
    }
  }, [subtasks]);

  async function getData() {
    try {
      const allocatedTime = differenceInMinutes(endTime, startTime);
      const jsonvalue = await AsyncStorage.getItem("todo");

      let value = null;
      if (jsonvalue) {
        value = JSON.parse(jsonvalue);
      }
      if (value == null) {
        value = { todos: [] };
      }
      setTodos(value.todos);

      setVals(value);
      // const userAttributes = await fetchUserAttributes();
      // const id = userAttributes.email;
      // if (id) {
      //     const { data: user } = await client.models.Users.get({
      //         email: id
      //     });
      //     const { data: todos } = await user.todo();
      //     setTodos(todos);  // No need to attach subtasks here, do it dynamically in getSubtasks
    } catch (error) {
      console.error(error);
    }
  }

  const SubtaskItem = (obj) => {
    const [isChecked, setIsChecked] = useState<boolean>(obj.completed); // Use subtask.completed directly
    const [isPressed, setIsPressed] = useState<boolean>(false);

    async function deleteSubtask(event: React.MouseEvent, subtaskId: string) {
      event.persist(); // Prevent event from being recycled
      let subtaskContainer = vals.todos[selectedTodo].subtasks;
      let temp = vals;

      let index = -1;
      for (var i = 0; i < subtaskContainer.length; i++) {
        if (subtaskContainer[i].subtaskId == subtaskId) {
          index = i;
        }
      }

      temp.todos[selectedTodo].subtasks.splice(index, 1);
      let jsonvalue = JSON.stringify(temp);
      await AsyncStorage.setItem("todo", jsonvalue);
      getSubtasks();

      // try {
      //     await client.models.Subtask.delete({
      //         id: subtaskId,
      //     });
      //     getSubtasks(todos[selectedTodo]!.id); // Reload subtasks for the current todo
      // } catch (error) {
      //     console.error("Error deleting subtask:", error);
      // }
    }

    async function handleCheck() {
      try {
        let subtaskContainer = vals.todos[selectedTodo].subtaskArr;
        let temp = vals;
        let index = -1;
        for (var i = 0; i < subtaskContainer.length; i++) {
          if (subtaskContainer[i].subtaskId == obj.subTaskId) {
            index = i;
          }
        }
        temp.todos[selectedTodo].subtask[index].completed = !isChecked;
        // await client.models.Subtask.update({
        //     id: subtask.id,
        //     completed: !isChecked,
        // });
        let jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem("todo", jsonvalue);

        setIsChecked(!isChecked);
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <TouchableOpacity style={styles.subtaskItemContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleCheck}>
            <View style={styles.checkbox}>
              {isChecked && <View style={styles.checkboxTick} />}
            </View>
          </TouchableOpacity>
          <Text
            style={{
              ...styles.todoText,
              color: isChecked ? COLORS.gray2 : COLORS.white,
            }}
          >
            {obj.task}
          </Text>
          <TouchableOpacity
            onPress={(event) => deleteSubtask(event, obj.subtaskId)}
          >
            <Image
              style={styles.trashIcon}
              resizeMode="contain"
              source={icons.trash}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleClick = (obj) => {
    if (isChooseTask) {
      router.push({ pathname: "home", params: { isTodo: obj.id } });
    } else {
      setIsClicked(true);

      var index = null;
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == obj.id) {
          index = i;
        }
      }

      setSelectedTodo(index);
    }
  };
  useEffect(() => {
    if (isClicked && selectedTodo !== null) {
      setSubtasks([]); // Clear subtasks immediately before fetching new ones
      setSubtaskTaskValue(""); // Clear input field value
      setModalVisible(true);
      getSubtasks();
      // Perform actions that rely on `selectedTodo` being updated
    }
  }, [selectedTodo, isClicked]);

  const handleSubtaskChange = useCallback(() => {
    if (subtaskTaskValue) {
      addSubtask(subtaskTaskValue);
      setIsSubtask(false);
      setSubtaskTaskValue("");
    } else {
      setIsSubtask(true);
      changeRef(ref);
    }
  }, [subtaskTaskValue]);

  const TodoItem = (obj) => {
    const [isChecked, setIsChecked] = useState<boolean>(obj.completed);
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
      if (isChecked === completed) {
        setShow(false);
      } else {
        setShow(true);
      }
    }, [obj.completed, completed]);

    async function deleteTodo() {
      try {
        var temp = vals;
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i;
          }
        }
        temp.todos.splice(index, 1);

        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem("todo", jsonvalue);
        getData();
      } catch (error) {
        console.error(error);
      }
    }

    async function handleCheck() {
      if (isChecked) {
        setIsChecked(false);
        var temp = vals;
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i;
          }
        }
        temp.todos[index].completed = false;
        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem("todo", jsonvalue);
      } else {
        var temp = vals;
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id == obj.id) {
            index = i;
          }
        }
        temp.todos[index].completed = true;
        const jsonvalue = JSON.stringify(temp);
        await AsyncStorage.setItem("todo", jsonvalue);
        setIsChecked(true);
      }
    }

    const ref = useRef(null);
    return (
      <View>
        {show && (
          <TouchableOpacity
            style={{
              flexDirection: "column",
              backgroundColor: COLORS.tertiary,
              borderRadius: 8,
              width: "100%",
            }}
            onPress={() => {
              handleClick(obj);
            }}
          >
            <View style={styles.todoItemContainer}>
              <TouchableOpacity onPress={handleCheck}>
                <View style={styles.checkbox}>
                  {isChecked && <View style={styles.checkboxTick} />}
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.todoText,
                  color: isChecked ? COLORS.gray2 : "white",
                  textDecorationLine: isChecked ? "line-through" : "none", // Strikethrough for completed tasks
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
              {format(new Date(obj.date), "MM/dd/yy")}{" "}
              {format(obj.start, "h:mma")} - {format(obj.end, "h:mma")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const changeRef = (ref: React.RefObject<any>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleStartConfirm = (time: Date) => {
    setStartTime(time);
    setStartTimePickerVisible(false);
  };

  const handleEndConfirm = (time: Date) => {
    setEndTime(time);
    setEndTimePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    setDueDate(date);
    setDatePickerVisible(false);
    setShowTask(true);
  };

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
        <View style={{ paddingHorizontal: 16, flex: 1, paddingVertical: 8 }}>
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style={styles.container}>
                <Header />
                {!isChooseTask && (
                  <View>
                    <View style={styles.barContainer}>
                      <TouchableOpacity
                        style={{ flex: 2 }}
                        onPress={() => setCompleted(true)}
                      >
                        {completed
                          ? yesCompleted("Tasks")
                          : notCompleted("Tasks")}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flex: 2 }}
                        onPress={() => setCompleted(false)}
                      >
                        {completed
                          ? notCompleted("Completed")
                          : yesCompleted("Completed")}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View>
                  <TouchableOpacity
                    style={styles.addContainer}
                    onPress={() => {
                      setModalVisible(true), setShowTask(true);
                    }}
                  >
                    <Image
                      style={styles.logo}
                      resizeMode="contain"
                      source={icons.addToDo}
                    />
                    <Text style={styles.addTodoText}>Add a New Task</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            ItemSeparatorComponent={() => (
              <View style={styles.listItemSeparator} />
            )}
            ListEmptyComponent={
              <Text style={styles.todoText}>The todo list is empty.</Text>
            }
          />
        </View>
      </SafeAreaView>

      <Modal isVisible={modalVisible}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
            setIsClicked(false);
            setShowTask(false);
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            {showTask && (
              <View style={styles.addTaskModal}>
                <Text style={styles.modalTitle}>Add a New Task</Text>
                <View style={styles.modalInput}>
                  <TextInput
                    style={{
                      flex: 5,
                      color: COLORS.white,
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      marginLeft: 10,
                    }}
                    placeholder="Task"
                    placeholderTextColor={COLORS.gray2}
                    value={taskValue}
                    onChangeText={setTaskValue}
                  />
                </View>

                <View style={styles.dateContainer}>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisible(true)}
                    style={styles.calendarButton}
                  >
                    <Image
                      source={icons.calendar}
                      resizeMode="contain"
                      style={styles.logo}
                    />
                    <Text style={styles.timeText}>
                      {format(dueDate, "MM/dd/yy")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={() => setDatePickerVisible(false)}
                />

                <View style={styles.timeRangeContainer}>
                  <View style={styles.timeTextContainer}>
                    <TouchableOpacity
                      onPress={() => setStartTimePickerVisible(true)}
                    >
                      <Text style={styles.timeText}>
                        Start: {format(startTime, "h:mm a")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.timeTextContainer}>
                    <TouchableOpacity
                      onPress={() => setEndTimePickerVisible(true)}
                    >
                      <Text style={styles.timeText}>
                        End: {format(endTime, "h:mm a")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={handleStartConfirm}
                  onCancel={() => setStartTimePickerVisible(false)}
                />

                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleEndConfirm}
                  onCancel={() => setEndTimePickerVisible(false)}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setModalVisible(false), setShowTask(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addTaskButton}
                    onPress={() =>
                      addTask(taskValue, dueDate, startTime, endTime)
                    }
                  >
                    <Text style={styles.modalButtonText}>Add Task</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {isClicked && (
              <View style={styles.modalContainer}>
                <FlatList
                  data={subtasks}
                  renderItem={renderSubtasks}
                  keyExtractor={(item) => item.id}
                  style={{ height: "60%" }}
                  ListHeaderComponent={
                    <View style={styles.modalTaskContainer}>
                      <TodoItem {...vals.todos[selectedTodo]} />
                    </View>
                  }
                  ListFooterComponent={
                    <View>
                      {isSubtask && (
                        <View style={styles.subtasktextContainer}>
                          <TextInput
                            style={[
                              styles.addsubtaskinputContainer,
                              subtaskTaskValue ? styles.inputActive : null,
                            ]}
                            value={subtaskTaskValue}
                            ref={ref}
                            onChangeText={(text) => setSubtaskTaskValue(text)}
                            onSubmitEditing={() => {
                              addSubtask(subtaskTaskValue);
                              setIsSubtask(false);
                              setSubtaskTaskValue("");
                            }}
                          />
                        </View>
                      )}
                      <TouchableOpacity
                        style={[
                          styles.addSubtaskContainer,
                          subtaskTaskValue && styles.addSubtaskContainerActive,
                        ]}
                        onPress={handleSubtaskChange}
                      >
                        <Text
                          style={[
                            styles.addSubtaskText,
                            subtaskTaskValue && { color: COLORS.white },
                          ]}
                        >
                          {" "}
                          + Add Subtask
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                  ItemSeparatorComponent={() => (
                    <View style={styles.listItemSeparator} />
                  )}
                  ListEmptyComponent={
                    <Text style={styles.todoText}>No Subtasks.</Text>
                  }
                />
              </View>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Todo;
