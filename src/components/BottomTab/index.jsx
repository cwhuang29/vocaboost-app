import React from 'react';
import { IconButton, useTheme as useThemeRN } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PropTypes from 'prop-types';

import { useColorMode, useTheme } from 'native-base';

import HomeScreen from 'screens/HomeScreen';
import ProfileScreen from 'screens/ProfileScreen';
import DefaultText from 'components/Text/DefaultText';
import { useReverseIconStyle } from 'shared/hooks/useIconStyle';
import { isDarkMode } from 'shared/utils/style';

const Tab = createMaterialBottomTabNavigator();

const tabBarIcon = {
  home: {
    focused: 'home-variant',
    unfocused: 'home-variant-outline',
  },
  profile: {
    focused: 'account-circle',
    unfocused: 'account-circle-outline',
  },
};

const TabBarIcon = props => {
  const iconColor = useReverseIconStyle();
  const icon = tabBarIcon[props.route.name.toLowerCase()];
  const style = { marginTop: -5 };
  return <IconButton iconColor={iconColor} style={style} icon={props.focused ? icon.focused : icon.unfocused} size={26} />;
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

const BottomTab = () => {
  const theme = useThemeRN();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const activeColor = isDarkMode(colorMode) ? colors.vhdark[900] : colors.vhlight[900];
  const inactiveColor = isDarkMode(colorMode) ? colors.vhdark[1000] : colors.vhlight[1000];
  theme.colors.secondaryContainer = 'transperent';

  return (
    <Tab.Navigator
      shifting
      labeled
      initialRouteName='Home'
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      safeAreaInsets={{ bottom: -12 }}
      barStyle={{ backgroundColor: inactiveColor, opacity: 0.95, paddingHorizontal: 0, paddingBottom: 20 }}
      screenOptions={({ route }) => ({
        tabBarIcon: getTagBarIcon({ route }),
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarLabel: <TabBarLabel color={activeColor}>Home</TabBarLabel> }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ tabBarLabel: <TabBarLabel color={activeColor}>Profile</TabBarLabel> }} />
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
