import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import HomeScreen from 'pages/HomeScreen';
import ProfileScreen from 'pages/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => (

    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = focused ? 'home-variant' : 'home-variant-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'account-circle' : 'account-circle-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={24} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

export default BottomTab;