import { AUTH_STATUS } from 'shared/actionTypes/auth';

export const authInitialState = {
  isLoading: true, // Cehcking if the token exists in local storage
  isSignout: false, // True when user is signing out
  token: null, // Assume the user is logged in if it's not null
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_STATUS.RESTORE_TOKEN:
      return { ...state, token: payload.token, isLoading: false };
    case AUTH_STATUS.SIGN_IN:
      return { ...state, token: payload.token, isSignout: false };
    case AUTH_STATUS.SIGN_OUT:
      return { ...state, token: null, isSignout: true };
    default:
      return state;
  }
};
