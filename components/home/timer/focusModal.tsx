import React, { useState, useEffect } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { icons, COLORS } from "../../../constants";
import styles from "./timer.style";

const BreakModal = ({ isVisible, onClose }) => {
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds for 5 minutes

  useEffect(() => {
    let timer;
    if (isExerciseStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 500);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsExerciseStarted(false);
      onClose(); // Automatically close the modal when time is up
    }

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [isExerciseStarted, timeLeft, onClose]);

  const handleStartExercise = () => {
    setIsExerciseStarted(true);
    setTimeLeft(300); // Reset timer to 5 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderContent = () => {
    if (isExerciseStarted) {
      return (
        <View style={styles.stressModal}>
          <Text style={styles.stressText}>Take a Break</Text>
          <Text style={styles.stressSubText}>Clear your mind and refocus.</Text>
          <View style={styles.breakTimeContainer}>
            <Text style={styles.time}>{formatTime(timeLeft)}</Text>
          </View>
          <TouchableOpacity
            style={styles.modalPrimaryButtons}
            onPress={() => {
              setIsExerciseStarted(false);
              onClose();
            }}
          >
            <Text style={styles.buttonText}>End Break</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.stressModal}>
        <Image
          style={styles.brainIcon}
          source={icons.brain}
          resizeMode="contain"
        />
        <Text style={styles.stressText}>Looks like you’re losing focus.</Text>
        <Text style={styles.stressSubText}>Take a 5 minute break.</Text>
        <Text style={styles.earnXPText}>Earn 30 XP</Text>
        <TouchableOpacity style={styles.modalGrayButtons} onPress={onClose}>
          <Text style={styles.buttonText}>No, thanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalPrimaryButtons}
          onPress={handleStartExercise}
        >
          <Text style={styles.buttonText}>Start Break</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal isVisible={isVisible}>
      <TouchableOpacity activeOpacity={1}>{renderContent()}</TouchableOpacity>
    </Modal>
  );
};

export default BreakModal;
