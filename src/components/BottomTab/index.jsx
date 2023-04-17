import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useColorMode, useTheme } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import ProfileScreen from 'pages/ProfileScreen';
import { isDarkMode } from 'shared/utils/style';

const Tab = createMaterialBottomTabNavigator();

const HomeIcon = ({ focused }) => <MaterialCommunityIcons name={focused ? 'home-variant' : 'home-variant-outline'} size={24} />;

const ProfileIcon = ({ focused }) => <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} size={24} />;

const TabBarIcon = props => {
  if (props.route.name === 'Home') return <HomeIcon {...props} />;
  if (props.route.name === 'Profile') return <ProfileIcon {...props} />;
  return null;
};

const getTagBarIcon =
  ({ route }) =>
  props =>
    <TabBarIcon route={route} {...props} />;

const BottomTab = () => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const activeColor = isDarkMode(colorMode) ? colors.vhdark[900] : colors.vhlight[900];
  const inactiveColor = isDarkMode(colorMode) ? colors.vhdark[1000] : colors.vhlight[1000];

  return (
    <Tab.Navigator
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      safeAreaInsets={{ bottom: 12 }}
      barStyle={{ backgroundColor: inactiveColor }}
      screenOptions={({ route }) => ({
        tabBarIcon: getTagBarIcon({ route }),
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

HomeIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

ProfileIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

TabBarIcon.propTypes = {
  route: PropTypes.object.isRequired,
};

export default BottomTab;
