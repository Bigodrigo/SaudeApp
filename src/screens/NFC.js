import React, { useState } from 'react';
import { Stack, HStack, Button, Text, Input, Select, CheckIcon, Checkbox, View, Icon, Box, ScrollView } from 'native-base'
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import { Modal, Fade } from 'native-base';
import { ActivityIndicator } from 'react-native';

export default function App() {
    const [showModal, setShowModal] = useState(false);
    const [sim, setSim] = useState('');
    const [text, onChangeText] = React.useState('');


    let session;

    const handleStartSimulation = () => {
        setShowModal(true);
        startSession();
    };

    const startSession = async () => {
        setSim('Simulando...');
        try {
            const tag = new NFCTagType4({
                type: NFCTagType4NDEFContentType.Text,
                content: text,
                writable: false,
            });

            session = await HCESession.getInstance();
            session.setApplication(tag);
            await session.setEnabled(true);
        } catch (e) {
            setSim('Erro ao simular.');
            console.log(e);
        }
    };

    const stopSession = async () => {
        try {
            session = await HCESession.getInstance();
            await session.setEnabled(false);
            setSim('Simulação pausada');
        } catch (e) {
            console.log(e);
        }
    };

    const listen = async () => {
        try {
            const removeListener = session.on(HCESession.Events.HCE_STATE_READ, () => {
                ToastAndroid.show("Consulta autorizada com sucesso!", ToastAndroid.LONG);
            });
            removeListener();
        } catch (e) {
            console.log(e)
        }
    }

    listen();

    return (
        <ScrollView w="100%">
            <Box bg='white' w='95%' h='93%' alignSelf='center' shadow={3} p={5} mt={5} borderRadius={15}>
                <Stack w="100%" h="100%" mx="auto" alignItems="center" justifyContent="flex-start" marginY="2">
                    <View>
                        <Text marginTop="0" alignSelf="flex-start" bold color="gray.800" fontSize="md">Status:</Text>
                        <Input w="100%" mt={3} borderColor="#DB4D37" borderRadius="10" bg="white" placeholder='Status' editable={false}>{sim}</Input>
                        <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Texto:</Text>
                        <Input mt={3} borderColor="#DB4D37" borderRadius="10" bg="white" placeholder="Digite aqui o seu texto" w="100%" onChangeText={onChangeText} />
                        <Button borderRadius="20" bg="#DB4D37" shadow={3} px="20" size="lg"
                            _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }} mt={5} onPress={() => handleStartSimulation()}>Começar Simulação</Button>
                        <Button borderRadius="20" bg="#DB4D37" shadow={3} px="20" size="lg"
                            _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }} mt={5} onPress={() => stopSession()}>Parar a simulação</Button>
                    </View>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content>
                            <Fade in={showModal} onExit={() => setSim('')}>
                                <Box p={5} bg="white" rounded="lg" shadow={4} alignItems="center" justifyContent="center">
                                    <Text bold fontSize="2xl" mb={3}>Simulando...</Text>
                                    <ActivityIndicator color="#DB4D37" size="large" />
                                </Box>
                            </Fade>
                        </Modal.Content>
                    </Modal>
                </Stack>
            </Box>
        </ScrollView>
    );
}


