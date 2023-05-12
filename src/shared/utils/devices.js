import DeviceInfo from 'react-native-device-info';

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
