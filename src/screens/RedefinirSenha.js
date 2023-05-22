// Essa página cria apenas um usuário no FireBase usando email e senha, na prática vamos consumir um BD, precisamos enviar tbm nome e outras infos da pessoa!
import React, { useState } from 'react'
import { Box, View, HStack, Stack, Heading, Text, Button, Center, Image, ScrollView, Icon } from 'native-base'
import { AlertMessage } from '../components/AlertMessage'
import { LinearGradient } from 'expo-linear-gradient';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import apiFetch from '../routes/api'
import { Dimensions } from 'react-native';
import { InputRegistro } from '../components/InputRegistro';
import { MaterialIcons } from '@expo/vector-icons';
import { isEmail } from 'validator';

export default function RedefinirSenha({ navigation, route }) {
    const [email, setEmail] = useState(route.params.email);
    const [loading, setLoading] = useState(false)
    var teste = ''

    const [{ alerttype, visible, show, message }, setAlertMessage] = useState({
        alerttype: '',
        visible: 'none',
        show: false,
        message: ''
    })

    function validarEmail(email) {
        return isEmail(email);
    }

    function validation() {
        if (!email) {
            setAlertMessage({
                alerttype: 'warning',
                visible: 'flex',
                show: true,
                message: 'Por favor, preencha o campo acima.'
            })
            setLoading(false)
        } else if (!validarEmail(email)) {
            setAlertMessage({
                alerttype: 'warning',
                visible: 'flex',
                show: true,
                message: 'E-mail inválido.'
            })
            setLoading(false)
        } else {
            recuperarSenha()
        }
    }

    const recuperarSenha = async () => {

        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setAlertMessage({
                alerttype: 'success',
                visible: 'flex',
                show: true,
                message: 'E-mail enviado. Verifique-o e Volte para o Login.'
            })
        } catch (error) {
            setLoading(false)
            //console.error(error);
            if (error = 'auth/user-not-found'){
                setAlertMessage({
                    alerttype: 'error',
                    visible: 'flex',
                    show: true,
                    message: 'Usuário não encontrado!'
                })
            }
        }
        
    }    

    return (

        <View style={{ flex: 1 }}  >
            <HStack space={0} justifyContent="center">
                <Center h="1" w="35%" bg="#EB6C36" m="0" shadow={3} />
                <Center h="1" w="35%" bg="#FAB937" shadow={3} />
                <Center h="1" w="35%" bg="#FCEAC5" shadow={3} />
            </HStack>

            <LinearGradient flex={1} colors={['#FCEAC5', '#FAB937', '#F58931']} locations={[0, 0.9, 1]} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} mx={4} flex={0.2} >

                    <Box flex={0.45} justifyContent='center' alignItems='center'>
                    <Image
                    source={require("../assets/app_sim_saude.png")}
                    style={{ width: 40, height: 40 }}
                    alt="Alternate Text"
                  />
                    </Box>

                    <Stack paddingBottom={10} space={2} flex={0.55} justifyContent='flex-start' alignItems='center'>
                        <Heading color="#DB4D37" size="lg">Redefinir a Senha</Heading>
                        <Text mb={10} color="#DB4D37">Digite seu e-mail:</Text>

                        <InputRegistro placeholder="Digite seu email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            InputLeftElement={<Icon as={<MaterialIcons name="email" />} ml={3} mr={1.5} size={6} color="gray.300" />}
                        />

                        <AlertMessage alerttype={alerttype} visible={visible} show={show} message={message} />

                        <View flexDir={'column'} marginTop={10}>
                            
                            <Button
                                isLoading={loading}
                                isLoadingText='Enviando...'
                                borderRadius="10"
                                borderWidth="2"
                                borderColor="white"
                                px="10"
                                bg="#DB4D37"
                                size="lg"
                                _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }}
                                onPress={() => validation()}
                            >
                                Enviar e-mail
                            </Button>

                            <Button
                                mt={2}
                                borderRadius="10"
                                backgroundColor={'transparent'}
                                outli
                                px="10"
                                size="md"
                                _text={{
                                    color: "#DB4D37",
                                    fontWeight: 'medium'
                                }}
                                onPress={() => navigation.navigate('Login')}
                            >
                               Voltar para Login
                            </Button>

                        </View>
                    </Stack>

                </ScrollView>
            </LinearGradient>

            <HStack space={0} style={{ position: 'absolute', bottom: 0 }} justifyContent="center">
                <Center h="1" w="35%" bg="#EB6C36" m="0" shadow={3} />
                <Center h="1" w="35%" bg="#FAB937" shadow={3} />
                <Center h="1" w="35%" bg="#FCEAC5" shadow={3} />
            </HStack>
        </View>
    )
}