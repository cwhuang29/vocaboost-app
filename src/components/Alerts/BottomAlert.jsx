import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Box, Center, HStack, Link, Text, VStack } from 'native-base';

import { ALERT_TIMEOUT } from 'shared/constants';
import { ALERT_STYLE, MAX_Z_INDEX } from 'shared/constants/styles';

const BottomAlert = ({ type, title, content, link, ts, bottom }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
    }, ALERT_TIMEOUT);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [ts]);

  return show ? (
    <Box safeAreaTop='5' zIndex={MAX_Z_INDEX} bottom={bottom} position='absolute' alignSelf='center'>
      <Center>
        <Alert maxW='100%' minW='100%' status={ALERT_STYLE[type]} colorScheme='info'>
          <VStack space={0.3} flexShrink={1} w='100%'>
            <HStack flexShrink={1} alignItems='center'>
              <Alert.Icon />
              <Text size='xs' fontWeight='medium' color='#3F3F3F' pl={3}>
                {title}
              </Text>
            </HStack>
            {content ? (
              <Box pl={7}>
                {link ? (
                  <Text size='xs' color='#3F3F3F'>
                    {content}&nbsp;
                    <Link href={link} isExternal _text={{ marginTop: '6', paddingTop: '0.2', fontSize: '16', color: 'blue.500', fontWeight: 'bold' }}>
                      here
                    </Link>
                  </Text>
                ) : (
                  <Text size='2xs' fontWeight='medium' color='#3F3F3F'>
                    {content}
                  </Text>
                )}
              </Box>
            ) : null}
          </VStack>
        </Alert>
      </Center>
    </Box>
  ) : null;
};

BottomAlert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string,
  ts: PropTypes.string.isRequired,
  bottom: PropTypes.number,
};

BottomAlert.defaultProps = {
  content: '',
  link: '',
  bottom: 130,
};

export default BottomAlert;
