import React, { useId, useState, useContext, useEffect } from "react";
import { Box, Avatar, Heading, Text, HStack, Button, Modal } from 'native-base'
import app_sim_saude from '../assets/app_sim_saude.png'
import { AuthContext } from '../contexts/AuthContext.js';
import firestore from "@react-native-firebase/firestore";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function Notification({data}) {
    const {userUid, notificacoes, setNotificacoes} = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);  

    return (
        <>
        <Box width="90%" shadow={3} bg="gray.200" borderRadius={20} p={5} my="3" >
            <HStack marginBottom={3}>
                <Avatar borderWidth={1} borderColor="gray.300" bg="white" marginRight={5} source={app_sim_saude}></Avatar>
                <Heading marginTop={3} color="gray.500" fontSize={18}>SAÚDE</Heading>
            </HStack>
            <Text fontWeight='bold' fontSize={16} color={"gray.500"} marginBottom={1}>{data.pergunta}</Text>
            <Text textAlign="justify" color={"gray.800"} flexWrap='nowrap'>{data.enviadoEm}</Text>
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
                <Modal.Header>{data.pergunta}</Modal.Header>
                <Modal.Body>
                    <Text>Data - {data.enviadoEm}</Text>
                    <Text>Sua resposta - {data.resposta}</Text>
                    <Text>Data - {data.recebidoEm}</Text>
                </Modal.Body>
            </Modal.Content>
            </Modal>
        </>
    )
}
