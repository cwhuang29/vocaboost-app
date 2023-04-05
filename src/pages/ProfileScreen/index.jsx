import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

const ProfileScreen = ({ navigation, route }) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfoCache, setUserInfoCache] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        setloggedIn(isSignedIn);
        if (isSignedIn) {
            const loginData = await storage.getData(STORAGE_LOGIN_INFO);
            setUserInfoCache(loginData);
        } else {
            setUserInfoCache([]);
        }
        };
        getUserInfo();
    }, []);

    return (
        <View>
            <Text>This is ProfileScreen</Text>
        </View>
    );
}

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default ProfileScreen;