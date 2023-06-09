import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Box, Center, CloseIcon, HStack, IconButton, Link, Text, VStack } from 'native-base';

import { ALERT_TIMEOUT } from 'shared/constants';
import { ALERT_STYLE, MAX_Z_INDEX } from 'shared/constants/styles';

const TopAlert = ({ type, title, content, link }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, ALERT_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show ? (
    <Box safeAreaTop='8' zIndex={MAX_Z_INDEX} top={5} position='absolute' alignSelf='center'>
      <Center>
        <Alert maxW='98%' minW='98%' status={ALERT_STYLE[type]} colorScheme='info'>
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

TopAlert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string,
};

TopAlert.defaultProps = {
  content: '',
  link: '',
};

export default TopAlert;
