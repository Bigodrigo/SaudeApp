import { Box, Icon, Center, HStack, Text, Input, View, Modal, IconButton } from 'native-base'
import { Button } from "../components/Button"
import { UserCard } from "../components/UserCard"
import { UserCardTela } from '../components/UserCard2'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import TouchID from 'react-native-touch-id';
import { Alert } from 'react-native'
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native'
import { Spinner, Image } from "native-base";
import { useToast } from 'native-base'
import Gif from '../components/Gif'


export default function CartaoVirtual({ navigation }) {
    const toast = useToast();
    var [isPressAprox, setIsPressAprox] = useState(false);
    var [isPressQr, setIsPressQr] = useState(false);
    var [isModalVisible, setIsModalVisible] = useState(false);
    const [gif, setGif] = useState(require('../assets/encoste.gif'));

    const [supported, setSupported] = useState(null);
    const [scanning, setScanning] = useState(false);

    function startScan() {
      setScanning(true);
    }
  
    function stopScan() {
      setScanning(false);
    }
  
    function onBarcodeRead(result) {
      // O resultado do QR code é retornado como um objeto
      console.log(result);
    }

    useEffect(() => {
        TouchID.isSupported()
            .then(sucesso => {
                setSupported(true);
                //console.log('certo')
            }).catch((error) => {
                //  console.log("ERRO TOUCH: " + error);
                alert('Atenção Digital não suportada/habilitada')
                setSupported(false);
            })
    }, []);

    let session;

    const handleStartSimulation = () => {
        startSession();

    };

const startSession = async () => {
  setSim('Simulando...');
  console.log('simulando');
  Alert.alert('Simulando...', 'Aproxime ao leitor');
  try {
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: text,
      writable: false,
    });

    session = await HCESession.getInstance();
    session.setApplication(tag);
    await session.setEnabled(true);

    setTimeout(() => {
      setSim(null);
    }, 3000); // Exibe o Alert por 3 segundos

  } catch (e) {
    setSim('Erro ao simular.');
    console.log(e);
    Alert.alert('Erro', 'Ocorreu um erro ao simular. Por favor, tente novamente mais tarde.');
  }
};

const stopSession = async () => {
  console.log('cancelando');
  setGif(require('../assets/encoste.gif'));
  try {
    session = await HCESession.getInstance();
    await session.setEnabled(false);
    setSim('Simulação pausada');
  } catch (e) {
    console.log(e);
    Alert.alert('Erro', 'Ocorreu um erro ao cancelar a simulação. Por favor, tente novamente mais tarde.');
  }
};

const listen = async () => {
  try {
    const removeListener = session.on(HCESession.Events.HCE_STATE_READ, () => {
      ToastAndroid.show("Consulta autorizada com sucesso!", ToastAndroid.LONG);
      Alert.alert('Erro', 'Ocorreu um erro ao cancelar a simulação. Por favor, tente novamente mais tarde.');
    });
    removeListener();
  } catch (e) {
    console.log(e)
  }
}

listen();

    const teste = () => {

        const configs = {
            title: 'Autenticacao Touch ID',
            color: '#FF0000',
            sensorErrorDescription: 'Digital inválida',
            sensorDescription: 'Por favor insira sua digital',

        };
        TouchID.authenticate("Autenticação de digital", configs)

            .then(success => {
                setIsModalVisible(true); // Alteração aqui
                setIsPressAprox(!isPressAprox)
                if (isPressQr == true) {
                    setIsPressQr(false)
                }
            })
            .catch(error => {

            })
    }
    const validacao = () => {
        if (supported == true) {
            Alert.alert('Escolha', 'Por favor selecione o metodo de autentificação', [
                {
                    text: 'voltar',
                    style: 'destructive',
                },
                {
                    text: 'Senha',
                    onPress: (() => {
                        setIsModalVisible(true); // Alteração aqui
                        setIsPressAprox(!isPressAprox)
                        if (isPressQr == true) {
                            setIsPressQr(false)
                        }
                    })
                }, {
                    text: 'Digital',
                    onPress: (teste)

                }
            ])
        }

        else {
            setIsModalVisible(true); // Alteração aqui
            setIsPressAprox(!isPressAprox)
            if (isPressQr == true) {
                setIsPressQr(false)
            }
        }
    }
    const [sim, setSim] = useState('');
    const [text, onChangeText] = React.useState('');

    return (
        <Box >
            <Center>

                <Box

                    borderRadius={10}
                    backgroundColor='white'
                    borderColor='transparent'
                    shadow={2}
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    padding={2}
                    width='90%'
                    height='98%'

                >


                    <HStack
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                        mt={-5}
                        marginBottom={6}
                    >
                        <Button
                            title="Aproximação"
                            backgroundColor='white'
                            textColor="gray.500"
                            leftIcon={<Icon as={MaterialCommunityIcons} name='contactless-payment' size='md' />}
                            _icon={{ color: 'gray.400' }}
                            _text={{ color: 'gray.400', fontWeight: 'bold' }}
                            borderWidth={2}
                            borderColor='gray.200'
                            shadow={2}
                            width='48%'
                            isPressed={isPressAprox}
                            onPress={validacao}
                            _pressed={{
                                _icon: { color: '#DB4D37' },
                                _text: { color: '#DB4D37' },
                                backgroundColor: 'white',
                                borderColor: '#DB4D37'
                            }}
                        />
                        
                        <Button
                            title="QR Code"
                            backgroundColor='white'

                            leftIcon={<Icon as={MaterialCommunityIcons} name='qrcode' size='md' />}
                            _icon={{ color: 'gray.400' }}

                            borderWidth={2}
                            borderColor='gray.200'
                            shadow={2}
                            width='48%'
                            isPressed={isPressQr}
                            onPress={startScan}
                            _pressed={{
                                _icon: { color: '#DB4D37' },
                                _text: { color: '#DB4D37' },
                                backgroundColor: 'white',
                                borderColor: '#DB4D37'
                            }}
                        />

                    </HStack>

                    <Box
                        backgroundColor='white'
                        width='95%'
                        alignItems="center"
                    >
                        <UserCardTela />
                    </Box>

                    <Center
                        marginTop={8}
                        marginBottom={20}
                    >
                        <Text
                            fontFamily='body'
                            fontSize='md'
                            marginBottom={2}
                            color='gray.800'
                        >
                            Informe a senha:
                        </Text>
                        <Input
                            width='45%'
                            borderRadius={16}
                            borderColor='gray.800'
                            borderWidth={2}
                            shadow={2}
                            backgroundColor='gray.100'
                            textAlign='center'
                            focusOutlineColor='gray.200'
                            type="password"
                            keyboardType="numeric"
                        />
                    </Center>
                    <Modal
                        isOpen={isModalVisible}
                        animationType="slide"
                        from="top"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                        onClose={() => setIsModalVisible(false)}
                    >
                        <LinearGradient
                            colors={['#DB4D37', '#fff', '#FFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 2, y: 1 }}
                            style={[styles.background, styles.blur]}
                        >
                            {/* Adiciona uma View que cobre toda a tela com opacidade diferente dos botões */}
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.0)' }} />

                            {/* Conteúdo do modal aqui, por exemplo: */}
                            <View style={{ position: 'relative' }}>
                                <IconButton
                                    style={{ position: 'absolute', top: 55, left: 0, padding: 10 }}
                                    icon={<Icon as={MaterialCommunityIcons} name="keyboard-backspace" color={'white'} size={8} />}
                                    onPress={() => setIsModalVisible(false)}
                                    _pressed={{ opacity: 0 }}
                                />
                                    <Box flex={1} marginTop={10} borderRadius={10} p={10} alignItems='center' justifyContent={'center'} height={'70%'} width={'97%'}>
                                    <View flex={0.33} mt={10} justifyContent={'flex-end'}>
                                        <UserCard />
                                    </View>
                                    <View flex={0.33} justifyContent={'flex-start'}>
                                        <Text marginTop="5" alignSelf="flex-start" bold color="white" fontSize="md">Texto:</Text>
                                        <Input mt={3} borderColor="#DB4D37" borderRadius="10" bg="white" placeholder="Digite aqui o seu texto" w="100%" onChangeText={onChangeText} />
                                    </View>
                                    <View mt={-10} alignItems='center' justifyContent='center'>
                                        <Gif source={gif} alt="Imagem Carregamento" />
                                        <Text color='black'>{sim}</Text>
                                    </View>
                                    <View flex={0.34} justifyContent={'center'}>
                                        <View flexDirection={'row'} justifyContent={'space-between'}>
                                            <Button marginRight={10} color='white' borderRadius="20" bg="#DB4D37" _text={{ color: 'white' }} shadow={3} size="lg" title={'Cancelar'}
                                                _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }} onPress={() => stopSession()} />
                                            <Button marginRight={2} color='white' borderRadius="20" bg='#DB4D37' shadow={3} size="lg" title={'Começar'}
                                                _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }} onPress={() => handleStartSimulation()} />
                                        </View>
                                    </View>
                                </Box>
                            </View>
                        </LinearGradient>
                    </Modal>

                </Box>
            </Center >

        </Box >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24,
    },
    blur: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(5px)',
    },
});