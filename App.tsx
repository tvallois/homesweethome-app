import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IDevice from "./app.types";

export default function App() {
  const fetchDevicesStatus = async () => {
    const response = await fetch("http://192.168.1.38:5000/devices", {
      method: "GET",
    });
    if (response.ok) {
      const data: IDevice[] = await response.json();
      setDevices(data);
    }
  };

  const [devices, setDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    fetchDevicesStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
