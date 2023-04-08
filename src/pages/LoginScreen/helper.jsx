import { statusCodes } from '@react-native-google-signin/google-signin';

import logger from 'shared/utils/logger';

export const showGoogleLoginErr = err => {
  if (err.code === statusCodes.SIGN_IN_CANCELLED) {
    logger('user cancelled the login flow');
  } else if (err.code === statusCodes.IN_PROGRESS) {
    logger('operation (e.g. sign in) is in progress already');
  } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    logger('play services not available or outdated');
  } else {
    logger(`UNKNOWN ERROR: ${err}`);
  }
};
