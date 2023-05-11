const msg = {
  UNKNOWN_ERROR: 'Oops, this is unexpected',
  TRY_AGAIN: 'Please try again',
  TRY_AGAIN_LATER: 'Please try again later',
  RELOAD_AND_RETRY: 'Please reload the page and try again',
  GO_BACK_AND_RETRY: 'Go back to previous page and try again',
  TRY_TOO_OFTEN: 'You are trying too often',
  NO_DATA: 'There are no data',
  SERVER_CRASH: 'We will be back as soon as possible. Thank you for your patience and please try again later',
  SERVER_UNSTABLE: 'Some functions may not work properly due to server error',
  MISSING: 'Something is missing ...',
  PERMISSION_DENIED: 'You are not allowed to perform this action',
  REQUEST_IS_HANDLING: 'Your request is being processed. Hold on please',
  LOGIN_REQUIRED: 'You have to login first',
};

export const validateMsg = {
  TOO_LONG: 'This value is too long',
  REQUIRED: 'This field is required',
  IS_NUMBER: 'The value of this field should be a number',
  AUTH: {
    FIRST_NAME_REQUIRED: 'First name is required',
    LAST_NAME_REQUIRED: 'Last name is required',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN: 'Password should be of minimum 8 characters length',
    PASSWORD_INCONSISTENTCY: 'Password and confirm password does not match',
    EMAIL_REQUIRED: 'Input must be a valid email',
    ROLE_REQUIRED: 'Role is required',
  },
};

export const formMsg = {
  ACCESS_VIA_LINK: 'You can only access this page via links',
};

export const EXT_MSG_TYPE_INIT_SETUP = 'EXT_MSG_TYPE_INIT_SETUP';
export const EXT_MSG_TYPE_GET_WORD_LIST = 'EXT_MSG_TYPE_GET_WORD_LIST';
export const EXT_MSG_TYPE_INSERT_CSS = 'EXT_MSG_TYPE_INSERT_CSS';
export const EXT_MSG_TYPE_CONFIG_UPDATE = 'EXT_MSG_TYPE_CONFIG_UPDATE';
export const EXT_MSG_TYPE_COLLECTED_WORD_LIST_UPDATE = 'EXT_MSG_TYPE_COLLECTED_WORD_LIST_UPDATE';

export const WS_CONNECTION_STATUS = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
  UNINSTANTIATED: 'UNINSTANTIATED',
};

export const STORAGE_ERR_MSG = {
  GET(key, err) {
    return `Storage get error. key: ${key}. Error: ${err}`;
  },
  SET(key, err) {
    return `Storage set error. key: ${key}. Error: ${err}`;
  },
  REMOVE(key, err) {
    return `Storage remove error. key: ${key}. Error: ${err}`;
  },
};

export const WELCOME_MSG = {
  TITLE: 'Welcome to VocaBoost 👋🏻',
  CONTENT: 'Start collecting words effortlessly by installing our browser extension ',
};

export const SIGNIN_FAILED_MSG = {
  TITLE: msg.UNKNOWN_ERROR,
  CONTENT: 'Please try login again in a minute',
};

export const SIGNOUT_FAILED_MSG = {
  TITLE: msg.UNKNOWN_ERROR,
  CONTENT: msg.TRY_AGAIN,
};

export const CONNECTED_WORDS_FAILED_MSG = {
  TITLE: "You haven't logged in yet",
  CONTENT: 'Login to keep your collection safely.',
};

export const AZURE_LOGIN_CONFIRM_MSG = {
  TITLE: 'Continue with Microsoft',
  CONTENT: 'To sign in with Microsoft account, make sure you have set up name and account picture.',
};

export default msg;
