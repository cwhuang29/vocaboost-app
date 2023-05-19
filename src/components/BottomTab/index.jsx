import React, { useMemo } from 'react';
import { IconButton, useTheme as useThemeRN } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

import { useTheme } from 'native-base';

import HomeScreen from 'screens/HomeScreen';
import ProfileScreen from 'screens/ProfileScreen';
import DefaultText from 'components/Text/DefaultText';
import { useDeviceInfoContext } from 'shared/hooks/useDeviceInfoContext';
import { useReverseIconStyle } from 'shared/hooks/useIconStyle';
import { useIsDarkMode } from 'shared/hooks/useIsDarkMode';
import { deviceIsAndroid } from 'shared/utils/devices';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const ProfileStack = createNativeStackNavigator();

const screens = {
  home: 'Home Stack',
  profile: 'Profile Stack',
};

const tabBarIcon = {
  [screens.home]: {
    focused: 'home-variant',
    unfocused: 'home-variant-outline',
  },
  [screens.profile]: {
    focused: 'account-circle',
    unfocused: 'account-circle-outline',
  },
};

const TabBarIcon = ({ route, focused }) => {
  const iconColor = useReverseIconStyle();
  const icon = tabBarIcon[route.name];
  const style = { marginTop: -3 };
  return <IconButton iconColor={iconColor} style={style} icon={focused ? icon.focused : icon.unfocused} size={26} />;
};

const getTagBarIcon =
  ({ route }) =>
  props =>
    <TabBarIcon route={route} {...props} />;

const TabBarLabel = ({ children, color }) => (
  <DefaultText color={color} size={2} textAlign='center'>
    {children}
  </DefaultText>
);

const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name='Home' component={HomeScreen} />
  </HomeStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name='Profile' component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const BottomTab = () => {
  const deviceInfo = useDeviceInfoContext();
  const isAndroid = useMemo(() => deviceIsAndroid(deviceInfo), []);
  const theme = useThemeRN();
  const { colors } = useTheme();
  const isDarkMode = useIsDarkMode();
  const activeColor = isDarkMode ? colors.vhdark[900] : colors.vhlight[900];
  const inactiveColor = isDarkMode ? colors.vhdark[1000] : colors.vhlight[1000];
  theme.colors.secondaryContainer = 'transperent';

  return (
    <Tab.Navigator
      shifting
      labeled
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      safeAreaInsets={{ bottom: isAndroid ? 0 : -10 }}
      barStyle={{ backgroundColor: inactiveColor, opacity: 0.95, paddingHorizontal: 0, paddingBottom: isAndroid ? 0 : 20 }}
      screenOptions={({ route }) => ({
        tabBarIcon: getTagBarIcon({ route }),
      })}
    >
      <Tab.Screen name={screens.home} component={HomeNavigator} options={{ tabBarLabel: <TabBarLabel color={activeColor}>Home</TabBarLabel> }} />
      <Tab.Screen name={screens.profile} component={ProfileNavigator} options={{ tabBarLabel: <TabBarLabel color={activeColor}>Profile</TabBarLabel> }} />
    </Tab.Navigator>
  );
};

TabBarIcon.propTypes = {
  route: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
};

TabBarLabel.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default BottomTab;
