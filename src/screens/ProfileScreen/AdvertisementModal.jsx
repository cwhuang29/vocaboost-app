import React, { useState } from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { Center, Link, Modal, Text, VStack } from 'native-base';

import apis from 'shared/constants/apis';
import { EXTENSION_LINK, GOOGLE_FORM_LINK } from 'shared/constants/link';
import { MAX_Z_INDEX } from 'shared/constants/styles';

export const ExternalLink = ({ link, text }) => (
  <Link isExternal href={link} _text={{ fontSize: 16, color: 'blue.500', fontWeight: 'bold' }} mx={0}>
    {text}
  </Link>
);

const IOSModalBody = () => (
  <>
    <Text size='xs' mb={4}>
      VocaBoost&nbsp;
      <ExternalLink link={EXTENSION_LINK} text='extension' />
      &nbsp;highlights GRE words on every web page you visit. Collect unfamiliar words when browsing webpages, and review them on this app.
    </Text>
    <Text size='xs'>
      Visit our&nbsp;
      <ExternalLink link={apis.OFFICAIL_HOME_PAGE} text='official website' />
      &nbsp;and feel free to leave a comment&nbsp;
      <ExternalLink link={GOOGLE_FORM_LINK} text='here' />.
    </Text>
  </>
);

const AndroidModalBody = () => (
  <>
    <Text size='xs' mb={4}>
      VocaBoost extension highlights GRE words on every web page you visit. Collect unfamiliar words when browsing webpages, and review them on this app.
    </Text>
    <VStack space={2}>
      <ExternalLink link={EXTENSION_LINK} text='Download extension' />
      <ExternalLink link={apis.OFFICAIL_HOME_PAGE} text='Go to official website' />
      <ExternalLink link={GOOGLE_FORM_LINK} text='Let us know your opinion' />
    </VStack>
  </>
);

const AdvertisementModal = ({ iconColor, isAndroid }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={{ zIndex: MAX_Z_INDEX }}>
        <AntDesign name='bulb1' size={36} color={iconColor} />
      </Pressable>
      <Center>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} _backdrop={{ _dark: { bg: 'coolGray.800' }, bg: 'warmGray.500' }}>
          <Modal.Content maxW='95%' minW='92%' maxH='500' _light={{ bgColor: 'vhlight.300' }} _dark={{ bgColor: 'vhdark.300' }}>
            <Modal.Header _light={{ bgColor: 'vhlight.300' }} _dark={{ bgColor: 'vhdark.300' }}>
              Boost Your Performance
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'flex-start' }}>{isAndroid ? <AndroidModalBody /> : <IOSModalBody />}</Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

ExternalLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

AdvertisementModal.propTypes = {
  iconColor: PropTypes.string.isRequired,
  isAndroid: PropTypes.bool.isRequired,
};

export default AdvertisementModal;
