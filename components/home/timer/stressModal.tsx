import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import WebView from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";
import { icons, COLORS } from "../../../constants";
import styles from "./timer.style";

const StressModal = ({ isVisible, onClose }) => {
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);

  const handleStartExercise = () => {
    setIsExerciseStarted(true);
    // Add any additional logic for starting the exercise
  };

  const renderContent = () => {
    if (isExerciseStarted) {
      return (
        <View style={styles.stressModal}>
          <Text style={styles.stressText}>Breathing Exercise</Text>
          <Text style={styles.stressSubText}>
            In through your nose and out through your mouth.
          </Text>
          <View
            style={{
              marginVertical: 20,
              alignSelf: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <YoutubePlayer
              height={Dimensions.get("window").height * 0.2}
              width={Dimensions.get("window").width * 0.8}
              play={true}
              videoId={"aNXKjGFUlMs"}
            />
          </View>
          <TouchableOpacity
            style={styles.modalPrimaryButtons}
            onPress={() => {
              setIsExerciseStarted(false);
              onClose();
            }}
          >
            <Text style={styles.buttonText}>End Exercise</Text>
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
        <Text style={styles.stressText}>
          Looks like you’re getting stressed.
        </Text>
        <Text style={styles.stressSubText}>
          Start 3 minute breathing exercise.
        </Text>
        <Text style={styles.earnXPText}>Earn 40 XP</Text>
        <TouchableOpacity style={styles.modalGrayButtons} onPress={onClose}>
          <Text style={styles.buttonText}>No, thanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalPrimaryButtons}
          onPress={handleStartExercise}
        >
          <Text style={styles.buttonText}>Start Breathing Exercise</Text>
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

export default StressModal;
