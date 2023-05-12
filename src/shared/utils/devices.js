import DeviceInfo from 'react-native-device-info';

export const isMobile = () => /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

export const getDeviceInfo = async () => {
  const [uniqueId, manufacturer] = await Promise.all([DeviceInfo.getUniqueId(), DeviceInfo.getManufacturer()]);
  const appVersion = DeviceInfo.getReadableVersion();
  const systemVersion = DeviceInfo.getSystemVersion();
  const deviceId = DeviceInfo.getDeviceId();
  const isTablet = DeviceInfo.isTablet();
  return { uniqueId, manufacturer, appVersion, systemVersion, deviceId, isTablet };
};
