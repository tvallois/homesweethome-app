import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import IDevice from "./app.types";
import Device from "./Device";

export default function App() {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [firstLoad, setFirstLoad] = useState(true);
  const fetchDevicesStatus = async () => {
    try {
      const response = await fetch("http://192.168.1.38:8123/devices", {
        method: "GET",
      });
      if (response.ok) {
        const data: IDevice[] = await response.json();
        setDevices(data);
        return;
      }
      setErrorMessage("Something went wrong while trying to fetch devices");
    } catch (error) {
      setErrorMessage("Internal error while trying to fetch devices");
    } finally {
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchDevicesStatus();
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage ? <Text>errorMessage</Text> : <></>}
      {firstLoad ? <Text>Loading...</Text> : <></>}
      {devices.map((device, index) => {
        return <Device key={index} addr={device.info.addr}></Device>;
      })}
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
