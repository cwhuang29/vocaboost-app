import DeviceInfo from 'react-native-device-info';

import { DEVICE_PLATFORM } from 'shared/constants';

export const isMobile = () => /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

export const getDeviceInfo = async () => {
  const [uniqueId, manufacturer] = await Promise.all([DeviceInfo.getUniqueId(), DeviceInfo.getManufacturer()]);
  const appVersion = DeviceInfo.getReadableVersion();
  const systemVersion = DeviceInfo.getSystemVersion();
  const deviceId = DeviceInfo.getDeviceId();
  const isTablet = DeviceInfo.isTablet();

  // {"uniqueId":"<string>","manufacturer":"Apple","appVersion":"1.1.0.1.1.1","systemVersion":"16.4","deviceId":"iPhone14,2","isTablet":false}
  return { uniqueId, manufacturer, appVersion, systemVersion, deviceId, isTablet };
};

export const deviceIsIOS = info => info.manufacturer === 'Apple';

export const deviceIsGoogle = info => info.manufacturer.toLowerCase() === 'google';

export const deviceIsHTC = info => info.manufacturer.toLowerCase() === 'htc';

export const deviceIsAndroid = info => !deviceIsIOS(info);

export const deviceIsTablet = info => !!info.isTablet;

export const deviceIsIphone = info => info.deviceId.startsWith('iPhone');

export const getDevicePlatform = info => {
  const isIos = deviceIsIOS(info);
  return isIos ? DEVICE_PLATFORM.ios : DEVICE_PLATFORM.android;
};
