import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
import { VStack, Center, Flex } from 'native-base';

import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Home = () => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfoCache, setUserInfoCache] = useState([]);

    const handleClick = () => {
        logger('Center component clicked');
        // console.log('Center component clicked');
    };

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
        <Flex flex={1} justifyContent="center">
            <VStack space={4} alignItems="center">
                <TouchableOpacity onPress={handleClick}>
                    <Center w="64" h="64" bg="indigo.300" rounded="md" shadow={3} _text={{color: "white"}}>GRE 1500</Center>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClick}>
                    <Center w="64" h="64" bg="indigo.500" rounded="md" shadow={3} _text={{color: "white"}}>Collected Words</Center>
                </TouchableOpacity>
            </VStack>
        </Flex>
    );
};

// Home.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
// };

export default Home;
