import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { Avatar, Button, Center } from "native-base";

import { STORAGE_AUTH_TOKEN, STORAGE_USER } from 'shared/constants/storage';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';


const ProfileScreen = ({ navigation, route }) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await storage.getData(STORAGE_USER);
            // userInfo:  {
                // "avatar": "https://lh3.googleusercontent.com/a/AGNmyxbch66tQpcv-TI3nGIO5Ksfp6zu9mHNqBHGQEc=s120", 
                // "createdAt": "2023-04-06T22:24:34", 
                // "email": "yunchipang@gmail.com", 
                // "firstName": "Yunchi", 
                // "lastName": "Pang", 
                // "loginMethod": 1, 
                // "uuid": "a6b46811-799a-475b-9709-8d73be14e798"}
            setUserInfo(userInfo);
        }
        getUserInfo();
    }, []);

    const handleLogout = async () => {
        await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
        await authService.logout().catch(() => {}); // For logout, just ignore error message
        
        setloggedIn(false);
        setUserInfo({});
      };
    
    const logout = async () => {
        // console.log("logout pressed!");
        const accessToken = await storage.getData(STORAGE_AUTH_TOKEN);
        // console.log("accessToken: ", accessToken);
        try {
            await GoogleSignin.signOut();
            await handleLogout();
        } catch (err) {
            logger(err); // TODO Ask user to logout again (due to network issues)
        }
    };

    // console.log("userInfo: ", userInfo);

    return (
        <Center>
            <Avatar size="xl" style={{ marginTop: 120 }} // todo: remove hard-coded image URL
                source={{ uri: userInfo ? 
                    userInfo.avatar : 
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbTNmzbm13hDKsd-PGH7i0EnWEYlUYOW1SefPBpg&s" }}>
                User
            </Avatar>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
                {userInfo ? userInfo.firstName : 'username'}
            </Text>
            <Button variant='vh2' onPress={logout} marginTop={3} disabled={!loggedIn}>Sign out</Button>
        </Center>
    );
}

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default ProfileScreen;