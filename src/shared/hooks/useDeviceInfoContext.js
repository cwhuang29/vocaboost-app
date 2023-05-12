import { createContext, useContext } from 'react';

const defaultValue = null;

export const DeviceInfoContext = createContext(defaultValue);
DeviceInfoContext.displayName = 'Device Info';

export const useDeviceInfoContext = () => useContext(DeviceInfoContext);
