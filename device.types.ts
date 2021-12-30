interface Property {
  name: string;
  attribute: number;
}

export interface IOnOffProperty extends Property {
  data: boolean;
}

export default interface IDeviceProps {
  addr: string;
}
