import { View, Checkbox, HStack, ScrollView, Stack, Pressable, Heading, Text, Input, Button, Center, Image, Link, Box, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AlertMessage } from '../components/AlertMessage'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import apiFetch from '../routes/api';
import SpinnerDefault from '../helpers/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from '@rneui/base';


export function Login({ navigation }) {
    const { setAuthData, setUserUid, setUserNome, setUserEmail, userMatricula, setUserMatricula, familia, setFamilia, setSexo, setEmpresa, setTelefone, setEndereço, setCep, notificacoes, setNotificacoes} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [carregando, setCarregando] = useState()
    const [isChecked, setIsChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const [{ alerttype, visible, show, message }, setAlertMessage] = useState({
        alerttype: '',
        visible: 'none',
        show: false,
        message: ''
    })

    useEffect(() => {
        async function getData() {
            try {
                const isChecked = (await AsyncStorage.getItem("isChecked")) === "true";
                if (isChecked === true) {
                    try {
                        const email = await AsyncStorage.getItem("email");
                        const password = await AsyncStorage.getItem("password");
                        setEmail(email);
                        setPassword(password);
                        setIsChecked(isChecked);
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (isChecked === false) {
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);

    function validation() {
        if (!email || !password) {
            setAlertMessage({
                alerttype: 'warning',
                visible: 'flex',
                show: true,
                message: 'Por favor, preencha os campos e-mail e senha.'
            })
            setLoading(false)
        } else {
            handleLogin()
        }
    }

    const saveUserData = async (uid) => {
        let data
        firestore().collection('users').doc(uid).get().then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                data = documentSnapshot.data()
                //let matricula = data.matricula
                setCep(data.cep)
                setEmpresa(data.empresa)
                setEndereço(data.endereço)
                setSexo(data.sexo)
                setTelefone(data.telefone)
                setUserEmail(data.email)
                setUserMatricula(data.matricula)
                setUserNome(data.nome)
                fetchUser()
                setLoading(false)
            }
        })
    }

    const saveUserNotification = async (uid) => {
        let usersRef = firestore().collection("users").doc(uid).collection("Mensagens");
        try {
            const querySnapshot = await usersRef.get();
            querySnapshot.forEach((doc) => {
              let r = doc.data();
              const notID = doc.id;
              const notObj = {
                  id: notID,
                  enviadoEm: r.enviadoEm,
                  pergunta: r.pergunta,
                  recebidoEm: r.recebidoEm,
                  resposta: r.resposta
              }
              notificacoes.push(notObj)
              //setNotificacoes([notObj, ...notificacoes])
          })
          } catch (error) {
            console.log("Erro ao obter os documentos:", error);
          }
    }

    const fetchUser = async () => {
        // setCarregando('carregando')
        // apiFetch( // Se necessário...
        // ).then((res) => {
        //     return res.data
        // }).then((data) => {
        //     data.resposta.map((user) => {
        //         if (user.nroMatricula == matricula) {
        //             setUserNome(user.nome)
        //             setUserMatricula(user.nroMatricula)
        //             console.log('Titular no Login', user.nome)
        //         }
        //         else {
        //             familia.push(user.nome)
        //             console.log('Dependente no Login', user.nome)
        //             console.log(familia)
        //         }
        //     })
        // }).then(() => {
        //     setCarregando('carregou')
        //     setAuthData(true)
        // }).catch((error) => {
        //     console.error(error)
        // })
        setCarregando('carregou')
        setAuthData(true)
    }

    const onChangeValue = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const onChangeCheckbox = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleLogin = async () => {
        if (isChecked === true) {
            try {
                await AsyncStorage.setItem("email", email);
                await AsyncStorage.setItem("password", password);
                await AsyncStorage.setItem("isChecked", isChecked.toString());
            } catch (error) {
                console.error(error);
            }
        }
        if (isChecked === false) {
            try {
                await AsyncStorage.setItem("isChecked", isChecked.toString());
            } catch (error) {
                console.error(error);
            }
        }

        setLoading(true)
        auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            if (userCredential) {
                const uid = userCredential.user.uid
                setUserUid(uid)
                saveUserData(uid)
                saveUserNotification(uid)
            }
        }).catch((e) => {
            setLoading(false)
            const errorCode = e.code
            console.log(errorCode)
            let errormessage = ''
            switch (errorCode) {
                case 'auth/missing-email':
                    errormessage = 'Digite seu email, por favor.'
                    break
                case 'auth/missing-password':
                    errormessage = 'Digite sua senha, por favor.'
                    break
                case 'auth/invalid-email':
                    errormessage = 'E-mail inválido.'
                    break
                case 'auth/wrong-password':
                    errormessage = 'Senha inválida.'
                    break
                case 'auth/user-not-found':
                    errormessage = 'Usuário não encontrado.'
                    break
                case 'auth/network-request-failed':
                    errormessage = 'Problema de conexão com a internet.'
                    break
                case 'auth/internal-error':
                    errormessage = 'Ocorreu algum erro. Tente novamente, por favor.'
                    break
            }
            setAlertMessage({
                show: true,
                visible: 'flex',
                alerttype: 'error',
                message: errormessage
            })
        })
    };    

    return (

        <View flex={1}  >

            <HStack zIndex={3} space={0} justifyContent="center">
                <Center h="1" w="35%" bg="#EB6C36" m="0" shadow={3} />
                <Center h="1" w="35%" bg="#FAB937" shadow={3} />
                <Center h="1" w="35%" bg="#FCEAC5" shadow={3} />
            </HStack>
            {carregando === 'carregando' ? <SpinnerDefault /> : ''}

            <LinearGradient flex={1} colors={['#FCEAC5', '#FAB937', '#F58931']} locations={[0, 0.9, 1]} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} flex={0.2} >

                    <View flex={1} mx='4'>
                        <Box flex={0.35} justifyContent='center' alignItems='center' mb={-5} >
                            <Image
                                source={require('../assets/app_saude.png')}
                                style={{ width: 190, height: 190 }}
                                alt="Alternate Text" />
                        </Box>
                        <Box mb={10} flex={0.65} justifyContent='flex-start' alignItems='center' >
                            <Heading mb='2' color="#F58931" size="lg">Seja bem-vindo!</Heading>
                            <Text mb='6' fontSize={18} color="#DB4D37">Acesse sua conta de forma segura:</Text>

                            {/* ************************ LOGIN GOV-BR **************************************** */}
                        
                            {/* <Text fontSize={18} fontWeight='bold' color="#DB4D37">entrar com:</Text>
                            <View w='60%' rounded={70} px={8} bg="white" shadow={3} my={10}>
                                <Button _pressed={{ bg: 'transparent' }} onPress={() => { setAuthData(true) }} bg={'transparent'}>
                                    <Image
                                        source={require('../assets/gov-br-logo.png')}
                                        style={{ height: 100 }}
                                        resizeMode='contain'
                                        alt="Alternate Text" />
                                </Button>
                            </View>
                            <Link _text={{
                                fontSize: "xl",
                                color: "#DB4D37"
                            }}>Acessar de outra forma</Link>
                            */}
                            {/* ************************ FIM LOGIN GOV-BR **************************************** */}

                            {/* ************************ LOGIN FIREBASE **************************************** */}

                            <Input
                                placeholder="Digite seu email"
                                value={email}
                                onChange={onChangeValue}
                                onChangeText={text => setEmail(text)}
                                style={{ height: 55 }}
                                size={'md'}
                                shadow={'box'}
                                borderRadius={'16'}
                                borderColor={'#deedda'}
                                InputLeftElement={<Icon as={<MaterialIcons name="email" />} ml={3} mr={1.5} size={6} color="gray.300" />}
                                isRequired={true}
                                _focus={{ borderColor: '#005B36' }}

                            />
                            <Input
                                placeholder="Digite sua senha"
                                onChangeText={text => setPassword(text)}
                                value={password}
                                onChange={onChangeValue}
                                
                                style={{ height: 55 }}
                                size={'md'}
                                shadow={'box'}
                                borderRadius={'16'}
                                borderColor={'#deedda'}
                                mt='2'
                                InputLeftElement={<Icon as={<MaterialIcons name="lock" />} ml={3} mr={1.5} size={6} color="gray.300" />}
                                isRequired={true}
                                _focus={{ borderColor: '#005B36' }}
                                
                                type={showPassword ? "text" : "password"} 
                                InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={6} mr={4} ml={1.5} opacity={0.4} color="#005B36" /></Pressable>}
                            />
                            <HStack flexDirection={'row'} w="100%">


                                <CheckBox size={18} uncheckedColor={'#005B36'} containerStyle={{ backgroundColor: 'transparent', padding: -5, marginRight: -2, marginBottom: 2, }}
                                    onChange={onChangeCheckbox} checkedColor={'#005B36'} checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)} />

                                {/* <Checkbox borderWidth={2} borderColor={'#deedda'} colorScheme={'green'} 
                                size={'sm'} ml={2} value="test" accessibilityLabel="Lembrar Usuário" /> */}


                                <Text fontSize={'13'} color={'#005B36'} alignSelf="center" mr='auto' > Lembrar usuário</Text>
                                <Link mr={2} isUnderlined={false} alignSelf="center" ml='auto' textDecoration={'none'}
                                    fontSize='2' _text={{ color: "#005B36", fontSize: '13' }} 
                                   onPress={() => navigation.navigate('RedefinirSenha', { email })}
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </HStack>

                            <AlertMessage alerttype={alerttype} visible={visible} show={show} message={message} />
                            <Button mt={3} isLoading={loading} isLoadingText='Enviando...' borderRadius="24"
                                width={'100%'} height={'16'} bg="green.600" size="lg" _text={{ fontWeight: 'bold' }} 
                                _pressed={{ backgroundColor: 'green.600', opacity: 0.5 }} onPress={() => validation()}>Entrar</Button>
                            <Box alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                                <Text color="#005B36">Não possui uma conta? </Text>
                                <Link py={4} isUnderlined={false} onPress={() => navigation.navigate('Registro')} _text={{ color: "green.600", fontWeight: 'medium' }}>Cadastre-se ➜</Link>
                            </Box>
                            {/* ************************ FIM LOGIN FB? **************************************** */}
                        </Box>
                    </View>


                </ScrollView>
            </LinearGradient>
            <HStack zIndex={2} space={0} style={{ position: 'absolute', bottom: 0 }} justifyContent="center">
                <Center h="1" w="35%" bg="#EB6C36" m="0" shadow={3} />
                <Center h="1" w="35%" bg="#FAB937" shadow={3} />
                <Center h="1" w="35%" bg="#FCEAC5" shadow={3} />
            </HStack>

        </View>
    )
}