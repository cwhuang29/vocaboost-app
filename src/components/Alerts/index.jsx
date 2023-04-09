import PropTypes from 'prop-types';

import { Alert, CloseIcon,HStack, IconButton, Text } from "native-base";

// status: green for success, red for failure
const CustomAlert = ({ status, title }) => (
    <Alert maxW='80%' status={status}>
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">{title}</Text>
            </HStack>
            <IconButton variant="unstyled" _focus={{borderWidth: 0}} icon={<CloseIcon size="3" />} _icon={{color: "coolGray.600"}} />
        </HStack>
    </Alert>
)

CustomAlert.propTypes = {
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default CustomAlert;