import React from 'react';
import PropTypes from 'prop-types';

import { Badge as NBBadge, HStack, Text, useColorMode } from 'native-base';

import { isDarkMode } from 'shared/utils/style';

const BadgeText = ({ children, fontFamily }) => (
  <Text size='6' lineHeight='26' w='100%' textAlign='center' fontFamily={fontFamily}>
    {children}
  </Text>
);

const Badge = ({ children, config }) => {
  const { colorMode } = useColorMode();
  const badgeColorScheme = isDarkMode(colorMode) ? 'dark' : 'warning';

  return (
    <NBBadge variant='subtle' colorScheme={badgeColorScheme} size='sm' alignSelf='center' borderRadius={3} px={2} py={0.2}>
      <BadgeText fontFamily={config.fontStyle.toLowerCase()}>{children}</BadgeText>
    </NBBadge>
  );
};

// eslint-disable-next-line no-unused-vars
const CollectedWordsTooltip = ({ display, wordType, progress, config }) =>
  display && (
    <HStack justifyContent='center' space={3} mb={2}>
      <Badge config={config}>{progress}</Badge>
      {/* <Badge config={config}>{wordType}</Badge> */}
    </HStack>
  );

BadgeText.propTypes = {
  children: PropTypes.node.isRequired,
  fontFamily: PropTypes.string.isRequired,
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object.isRequired,
};

CollectedWordsTooltip.propTypes = {
  display: PropTypes.bool.isRequired,
  progress: PropTypes.string.isRequired,
  wordType: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};

export default CollectedWordsTooltip;
