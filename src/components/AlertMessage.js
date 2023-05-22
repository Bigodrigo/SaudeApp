import React from "react";
import { Collapse, Alert, HStack, Text } from 'native-base'

export function AlertMessage(props) {
    return (
        <Collapse display={props.visible} isOpen={props.show}>
            <Alert w="100%" mt={5} p={4} status={props.alerttype}>
                <HStack alignItems="center">
                    <Alert.Icon marginRight={3} />
                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                        {props.message}
                    </Text>
                </HStack>
            </Alert>
        </Collapse>
    )
}