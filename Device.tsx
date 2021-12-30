import { useEffect, useState } from "react";
import { View, Text, Switch } from "react-native";
import IDeviceProps, { IOnOffProperty } from "./device.types";

const Device = (props: IDeviceProps) => {
  const [property, setProperty] = useState<IOnOffProperty>();
  const getProperty = async (addr: string) => {
    const response = await fetch(
      `http://192.168.1.38:8123/devices/${addr}/onoff`
    );
    if (response.ok) {
      const data: IOnOffProperty = await response.json();
      setProperty(data);
    }
  };

  useEffect(() => {
    getProperty(props.addr);
  }, []);

  const handleSwitchChange = (newValue: boolean) => {
    if (property?.data === true && newValue === false) {
      switchOff();
      const newProperty = { ...property, data: false };
      setProperty(newProperty);
    }

    if (property?.data === false && newValue === true) {
      switchOn();
      const newProperty = { ...property, data: true };
      setProperty(newProperty);
    }
  };

  const switchOn = async () => {
    await fetch(
      `http://192.168.1.38:8123/triggers/lights/switch_on/${props.addr}`,
      {
        method: "POST",
      }
    );
  };

  const switchOff = async () => {
    await fetch(
      `http://192.168.1.38:8123/triggers/lights/switch_off/${props.addr}`,
      {
        method: "POST",
      }
    );
  };

  return (
    <View>
      <Text>Device {props.addr}</Text>
      <Switch
        value={property?.data}
        onValueChange={handleSwitchChange}
      ></Switch>
    </View>
  );
};

export default Device;
