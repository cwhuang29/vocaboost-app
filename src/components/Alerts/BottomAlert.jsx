import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Box, Center, CloseIcon, HStack, IconButton, Link, Text, VStack } from 'native-base';

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
        <Alert maxW='99%' minW='99%' status={ALERT_STYLE[type]} colorScheme='info'>
          <VStack space={1} flexShrink={1} w='100%'>
            <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
              <HStack flexShrink={1} space={2} alignItems='center'>
                <Alert.Icon />
                <Text fontSize='md' fontWeight='medium' color='coolGray.800'>
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant='unstyled'
                _pressed={{ bgColor: 'coolGray.300', rounded: 'full', padding: 2 }}
                padding={2}
                _focus={{ borderWidth: 0 }}
                icon={<CloseIcon size='3' />}
                _icon={{ color: 'coolGray.600' }}
                onPress={() => setShow(false)}
              />
            </HStack>
            {content ? (
              <Box pl='6'>
                {link ? (
                  <Link href={link} isExternal>
                    {content}
                  </Link>
                ) : (
                  <Text>{content}</Text>
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
