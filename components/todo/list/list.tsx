import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './list.style';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../../amplify/data/resource";
import { fetchUserAttributes } from 'aws-amplify/auth';
import Modal from "react-native-modal";

const client = generateClient<Schema>(); // use this Data client for CRUDL requests

const List = () => {
    const [completed, setCompleted] = useState<boolean>(true);
    const [taskValue, setTaskValue] = useState<string>('');
    const [subtaskTaskValue, setSubtaskTaskValue] = useState<string>(''); // New state for subtask input
    const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
    const [subtasks, setSubtasks] = useState<Schema["Subtask"]["type"][]>([]); // New state for subtasks
    const [selectedTodo, setSelectedTodo] = useState<Schema["Todo"]["type"] | null>(null); // State for selected task
    const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility
    const [isSubtask, setIsSubtask] = useState<boolean>(false); // State to track if adding a subtask

    // Fetch tasks for the logged-in user
    async function getData() {
        try {
            const userAttributes = await fetchUserAttributes();
            const id = userAttributes.email;
            if (id) {
                const { data: td } = await client.models.Users.get({
                    email: id
                });
                const { data: members } = await td.todo();
                setTodos(members);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch subtasks for a specific task
    async function getSubtasks(todoId: string) {
        try {
            const { data: subtaskList } = await client.models.Todo.get({
                id: todoId
            }).subtask();
            setSubtasks(subtaskList);
        } catch (error) {
            console.error(error);
        }
    }

    // Add a new task
    async function addTask(text) {
        try {
            const userAttributes = await fetchUserAttributes();
            const { data: todo } = await client.models.Users.get({
                email: userAttributes.email,
            });
            await client.models.Todo.create({
                task: text,
                date: new Date().toISOString().split('T')[0],
                listId: todo.email,
                completed: false,
            });
            setTaskValue('');
            getData(); // Refresh the list of tasks
        }
        catch (error) {
            console.error(error);
        }
    }

    // Add a new subtask
    async function addSubtask(text: string) {
        try {
            const { data: subtask } = await client.models.Subtask.create({
                task: text,
                subtaskId: selectedTodo.id,  // Link to the selected todo
                completed: false,
            });
            setSubtaskTaskValue('');
            getSubtasks(selectedTodo.id); // Refresh the subtasks
        } catch (error) {
            console.error(error);
        }
    }

    // Rendering the subtasks
    const renderSubtask = ({ item }: { item: Schema["Subtask"]["type"] }) => (
        <SubtaskItem {...item} />
    );

    // Rendering the main tasks
    const renderItem = ({ item }: { item: Schema["Todo"]["type"] }) => (
        <View>
            <TodoItem {...item} />
            <FlatList
                data={subtasks}
                renderItem={renderSubtask}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.subtaskListContainer} // Ensuring proper layout of subtasks
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <TouchableOpacity style={{ flex: 2 }} onPress={() => setCompleted(true)}>
                    {completed ? (yesCompleted("Tasks")) : (notCompleted("Tasks"))}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 2 }} onPress={() => setCompleted(false)}>
                    {completed ? (notCompleted("Completed")) : (yesCompleted("Completed"))}
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.addContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={icons.addToDo}
                    />
                    <TextInput
                        style={styles.todoText}
                        placeholder="Add a task"
                        placeholderTextColor='white'
                        value={taskValue}
                        onChangeText={(text) => setTaskValue(text)}
                        onSubmitEditing={() => addTask(taskValue)}
                    />
                </View>
            </View>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Modal isVisible={modalVisible} style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity
                        style={{
                            
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        activeOpacity={1}
                        onPressOut={() => { setModalVisible(false); setIsSubtask(false); setSelectedTodo(null); }}
                    >
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.modalContainer}>
                                <FlatList
                                    data={subtasks}
                                    renderItem={renderSubtask}
                                    keyExtractor={(item) => item.id}
                                    ListHeaderComponent={
                                        <View>
                                            <Text style={styles.modalTitle}>Subtasks for {selectedTodo?.task}</Text>
                                        </View>
                                    }
                                />
                                <TextInput
                                    style={styles.addsubtaskinputContainer}
                                    value={subtaskTaskValue}
                                    onChangeText={(text) => setSubtaskTaskValue(text)}
                                    onSubmitEditing={() => addSubtask(subtaskTaskValue)}
                                    placeholder="Add a subtask"
                                    placeholderTextColor="white"
                                />
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </View>
    );
}

export default List;
