import API from 'shared/constants/apis';
import { extractErrorMessage } from 'shared/utils/handleErrorMessage';

import axios from 'axios';

const getAzureUserPhoto = ({ accessToken }) =>
  axios
    .get(API.OAUTH.AZURE.AVATAR_360, {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: 'arraybuffer', // Note: blob is a browser-only option
    })
    .then(resp => resp.data)
    .catch(err => Promise.reject(extractErrorMessage(err)));

export default {
  getAzureUserPhoto,
};
