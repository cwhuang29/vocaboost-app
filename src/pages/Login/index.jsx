import React, { useContext, useEffect, useState } from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { Box } from 'native-base';

import { AuthContext } from 'shared/hooks/useAuthContext';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';

import { showGoogleLoginErr } from './helper';

const Login = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
      // androidClientId: GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    });
  }, []);

  const googleSignIn = async () => {
    try {
      setIsSigninInProgress(true);
      // Always resolves to true on iOS. Presence of up-to-date Google Play Services is required to show the sign in modal
      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      signIn(transformGoogleLoginResp(uInfo));
    } catch (err) {
      showGoogleLoginErr(err);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <Box alignItems='center' marginTop={150} px={5}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={isSigninInProgress}
      />
    </Box>
  );
};

export default Login;
