import msg from 'shared/constants/messages';

// https://axios-http.com/docs/handling_errors
export const extractErrorMessage = err => {
  let errMsg;

  if (err.response) {
    // The request was made and the server responded with a status code that falls out of the range
    // errHead and errBody are the most common keys I set in backend when an error occurs
    errMsg = {
      status: err.response.status,
      title: err.response.data.errHead || msg.UNKNOWN_ERROR,
      content: err.response.data.errBody || '',
      ...err.response.data,
    };
  } else if (err.request) {
    // The request was made but no response was received
    // There is no err.response and err.code might be 'ERR_NETWORK'
    errMsg = { title: msg.NETWORK_ISSUE, content: msg.TRY_AGAIN_LATER };
  } else {
    // Something happened in setting up the request that triggered an Error
    errMsg = { title: `${msg.UNKNOWN_ERROR} (${err.message})`, content: msg.TRY_AGAIN };
  }

  return errMsg;
};
