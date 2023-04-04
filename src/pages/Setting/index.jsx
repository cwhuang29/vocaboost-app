import React, { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

import { Box, Button, Text } from 'native-base';

import { getWSConnStatusDisplay } from 'shared/utils/messages';

const Setting = () => {
  const [socketUrl, setSocketUrl] = useState(BACKEND_URL);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('wss://demos.kaazing.com/echo'), []);

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connStatus = getWSConnStatusDisplay(readyState);

  return (
    <Box>
      <Text>The WebSocket is currently {connStatus}</Text>
      <Button variant='vh1' onPress={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </Button>
      <Button variant='vh1' onPress={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send 'Hello'
      </Button>
      <Text>{lastMessage ? <Text>Last message: {lastMessage.data}</Text> : null}</Text>
      <Text>{JSON.stringify(messageHistory)}</Text>
    </Box>
  );
};

export default Setting;
