interface IInfo {
  addr: string;
  ieee: string;
  lqi: number;
  mac_capability: string;
  last_seen: string;
}

export default interface IDevice {
  info: IInfo;
  missing: boolean;
  discovery: string;
}
