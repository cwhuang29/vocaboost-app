import { ReadyState } from 'react-use-websocket';

import { WS_CONNECTION_STATUS } from 'shared/constants/messages';

export const getWSConnStatusDisplay = state => {
  const connectionStatus = {
    [ReadyState.CONNECTING]: WS_CONNECTION_STATUS.CONNECTING,
    [ReadyState.OPEN]: WS_CONNECTION_STATUS.OPEN,
    [ReadyState.CLOSING]: WS_CONNECTION_STATUS.CLOSING,
    [ReadyState.CLOSED]: WS_CONNECTION_STATUS.CLOSED,
    [ReadyState.UNINSTANTIATED]: WS_CONNECTION_STATUS.UNINSTANTIATED,
  };
  return connectionStatus[state];
};
