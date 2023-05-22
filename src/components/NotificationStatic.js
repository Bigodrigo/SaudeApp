import React, { useState } from "react";
import { Box, Avatar, Heading, Text, HStack, Button, Modal } from 'native-base'
import app_sim_saude from '../assets/app_sim_saude.png'

export function NotificationStatic(props) {
    const { title, description } = props
    const [showModal, setShowModal] = useState(false);


    return (
        <>
        <Box width="90%" shadow={3} bg="gray.200" borderRadius={20} p={5} my="3" >
            <HStack marginBottom={3}>
                <Avatar borderWidth={1} borderColor="gray.300" bg="white" marginRight={5} source={app_sim_saude}></Avatar>
                <Heading marginTop={3} color="gray.500" fontSize={18}>SAÚDE</Heading>
            </HStack>
            <Text fontWeight='bold' fontSize={16} color={"gray.500"} marginBottom={1}>{title}</Text>
            <Text textAlign="justify" color={"gray.800"} height={69} flexWrap='nowrap'>{description}</Text>
            <Button p={0} m={0} h={18} alignItems='center' bgColor='gray.200' onPress={() => setShowModal(true)} alignSelf='flex-end' _text={{color: '#DB4D37'}}> Ler mais... </Button>
        </Box>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
            _dark: {
            bg: "coolGray.800"
            },
            bg: "warmGray.50"
        }}>
            <Modal.Content maxWidth="350" maxH="212">
                <Modal.CloseButton />
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    {description}
                </Modal.Body>
            </Modal.Content>
            </Modal>
        </>
    )
}
