// UseBLE.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { useAndroidPermissions } from "./useAndroidPermissions";
import { COLORS, SIZES, FONT, icons } from "../../constants";
import styles from "./bluetooth.style";

const bleManager = new BleManager();

const DEVICE_NAME = "ESP32_EEG";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

interface UseBLEProps {
  onDataReceived: (data: string) => void;
}

export default function UseBLE({ onDataReceived }: UseBLEProps) {
  const [hasPermissions, setHasPermissions] = useState<boolean>(
    Platform.OS === "ios"
  );
  const [waitingPerm, grantedPerm] = useAndroidPermissions();
  const [connectionStatus, setConnectionStatus] = useState("Searching...");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [device, setDevice] = useState<Device | null>(null);
  const [data, setData] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      setHasPermissions(grantedPerm);
    }
  }, [grantedPerm]);

  useEffect(() => {
    if (hasPermissions) {
      searchAndConnectToDevice();
    }
  }, [hasPermissions]);

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error(error);
        setIsConnected(false);
        setConnectionStatus("Error searching for devices");
        return;
      }

      if (scannedDevice?.name === DEVICE_NAME) {
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting...");
        connectToDevice(scannedDevice);
      }
    });
  };

  const connectToDevice = async (scannedDevice: Device) => {
    try {
      const _device = await scannedDevice.connect();
      await _device.discoverAllServicesAndCharacteristics();
      setConnectionStatus("Connected");
      setIsConnected(true);
      setDevice(_device);
      setIsModalVisible(true); // Show modal when connected
    } catch (error) {
      setConnectionStatus("Error in Connection");
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (!device) {
      return;
    }

    const subscription = bleManager.onDeviceDisconnected(
      device.id,
      (error, disconnectedDevice) => {
        if (error) {
          console.log("Disconnected with error:", error);
        }
        setConnectionStatus("Disconnected");
        setIsConnected(false);

        if (disconnectedDevice) {
          setConnectionStatus("Reconnecting...");
          connectToDevice(disconnectedDevice)
            .then(() => {
              setConnectionStatus("Connected");
              setIsConnected(true);
              setIsModalVisible(true); // Show modal when reconnected
            })
            .catch((error) => {
              console.log("Reconnection failed: ", error);
              setConnectionStatus("Reconnection failed");
              setIsConnected(false);
              setDevice(null);
            });
        }
      }
    );

    return () => subscription.remove();
  }, [device]);

  useEffect(() => {
    if (!device || !isConnected) {
      return;
    }

    const intervalId = setInterval(() => {
      device
        .readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID)
        .then((characteristic) => {
          const decodedData = decodeAndParseData(characteristic.value);
          setData(decodedData);
          onDataReceived(decodedData); // Call the callback with the new data
        })
        .catch((error) => {
          console.error("Read characteristic error:", error);
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [device, isConnected]);

  const decodeAndParseData = (base64String: string): string => {
    const decodedString = atob(base64String);
    const keyValuePairs = decodedString.split("\t");
    return keyValuePairs.join("\n");
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Device Connected!</Text>
            <View style={styles.earbudsContainer}>
              <View style={styles.earbud}>
                <Image source={icons.earbudLeft} style={styles.earbudImage} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              </View>
              <View style={styles.earbud}>
                <Image source={icons.earbudRight} style={styles.earbudImage} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
