// Essa página cria apenas um usuário no FireBase usando email e senha, na prática vamos consumir um BD, precisamos enviar tbm nome e outras infos da pessoa!
import React, { useState } from "react";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AlertMessage } from "../components/AlertMessage";
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import apiFetch from "../routes/api";
import { Dimensions } from "react-native";
import { InputRegistro } from "../components/InputRegistro";
import { CheckBox } from "@rneui/base";
import TermosdeUso from "../helpers/TermosdeUso";

const { height } = Dimensions.get("window");

export default function Registro({ navigation }) {
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState();
  var teste = "";

  const [{ alerttype, visible, show, message }, setAlertMessage] = useState({
    alerttype: "",
    visible: "none",
    show: false,
    message: "",
  });

  const verificaMatricula = () => {
    // apiFetch(// Caminho da API aqui
    // ).then((res) => {
    //         return res.data
    //     }).then((data) => {

    //         try {
    //             data.resposta.map((item) => {
    //                 if (item.nroMatricula == matricula) {
    //                     console.log('Funcionou')
    //                     teste = item.nroMatricula;
    //                     console.log(teste)
    //                 } else {
    //                     //console.log('Nao funcionou')
    //                     if (teste === '') {
    //                         teste = 'Matrícula não encontrada.';
    //                     }
    //                 }
    //             })
    //         }
    //         catch {
    //             teste = 'Matrícula não encontrada.';
    //         }

    //     }).then(() => {
    //         console.log(teste);
    //         if (teste == 'Matrícula não encontrada.') {
    //             setAlertMessage({
    //                 alerttype: 'warning',
    //                 visible: 'flex',
    //                 show: true,
    //                 message: 'Número de matrícula não encontrado.'
    //             })
    //             setLoading(false)
    //         } else {

    //  console.log(teste)

    const usercredentials = auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usercredentials) => {
        if (usercredentials) {
          firestore()
            .collection("users")
            .doc(usercredentials.user.uid)
            .set({
              email: email,
              nome: nome,
            })
            .then(() => {
              //  console.log('User added.')
              setAlertMessage({
                alerttype: "success",
                visible: "flex",
                show: true,
                message: "Cadastro realizado com sucesso. Redirecionando...",
              });
              setTimeout(() => {
                navigation.navigate("Login");
                setLoading(false);
              }, 3000);
            })
            .catch((error) => {
              setAlertMessage({
                alerttype: "error",
                visible: "flex",
                show: true,
                message:
                  "Não foi possível realizar o cadastro. Tente novamente mais tarde.",
              });
            });
        }
      })

      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        let e = "";
        console.log(errorCode);
        switch (errorCode) {
          case "auth/missing-email":
            e = "Digite seu email, por favor.";
            break;
          case "auth/invalid-email":
            e = "E-mail inválido.";
            break;
          case "auth/email-already-in-use":
            e = "Este e-mail já está sendo utilizado em outra conta.";
            break;
          case "auth/internal-error":
            e = "Digite sua senha, por favor.";
            break;
          case "auth/wrong-password":
            e = "Senha inválida.";
            break;
          case "auth/weak-password":
            e = "Senha muito fraca. Por favor utilize outra senha.";
            break;
          case "auth/user-not-found":
            e = "Usuário não encontrado.";
            break;
          default:
            e = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
            break;
        }
        setAlertMessage({
          alerttype: "error",
          visible: "flex",
          show: true,
          message: e,
        });
      });
    // console.log(teste)
  };

  function validation() {
    if (!email || !password || !nome) {
      setAlertMessage({
        alerttype: "warning",
        visible: "flex",
        show: true,
        message: "Por favor, preencha os campos e-mail, senha e matrícula.",
      });
      setLoading(false);
    } else if (password !== confirmpassword) {
      setAlertMessage({
        alerttype: "warning",
        visible: "flex",
        show: true,
        message: "As senhas informadas não são iguais.",
      });
      setLoading(false);
    } else if (isChecked !== true) {
      setAlertMessage({
        alerttype: "warning",
        visible: "flex",
        show: true,
        message: "Aceite os termos de uso",
      });
    } else {
      console.log("CRIOU!");
      handleSignUp();
    }
  }

  const handleSignUp = async () => {
    setLoading(true);
    verificaMatricula();
  };

  return (
    <View style={{ flex: 1 }}>
      <HStack zIndex={3} space={0} justifyContent="center">
        <Center h="1" w="35%" bg="#EB6C36" m="0" shadow={3} />
        <Center h="1" w="35%" bg="#FAB937" shadow={3} />
        <Center h="1" w="35%" bg="#FCEAC5" shadow={3} />
      </HStack>
      <LinearGradient flex={1} colors={['#FCEAC5', '#FAB937', '#F58931']} locations={[0, 0.9, 1]} >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} flex={0.2}>
          <View flex={1} mx="4">
            <Box flex={0.45} justifyContent="flex-start" alignItems="center">
              <IconButton
                onPress={() => navigation.navigate("Login")}
                mt={2}
                _pressed={{ backgroundColor: "gray.200" }}
                borderRadius={"full"}
                position={"absolute"}
                alignSelf={"flex-start"}
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="arrow-back"
                    size={"lg"}
                    color="gray.300"
                  />
                }
              />
              <Image
                source={require("../assets/app_sim_saude.png")}
                style={{ width: 300, height: 250 }}
                alt="Alternate Text"
              />
            </Box>
            <Box
              paddingBottom={10}
              flex={0.55}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Heading mb={2} color="#DB4D37" size="lg">
                Cadastre-se
              </Heading>
              <Text mb={6} color="#005B36">
                Por favor, preencha o formulário abaixo:
              </Text>

              <InputRegistro
                placeholder="Qual seu nome?"
                value={nome}
                onChangeText={(text) => setNome(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    ml={3}
                    mr={1.5}
                    size={6}
                    color="gray.300"
                  />
                }
              />

              <InputRegistro
                placeholder="Digite seu email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    ml={3}
                    mr={1.5}
                    size={6}
                    color="gray.300"
                  />
                }
              />

              <InputRegistro
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                onChangeText={(text) => setPassword(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    ml={3}
                    mr={1.5}
                    size={6}
                    color="gray.300"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"}
                        />
                      }
                      size={6}
                      mr={4}
                      ml={1.5}
                      opacity={0.4}
                      color="#005B36"
                    />
                  </Pressable>
                }
              />

              <InputRegistro
                placeholder="Confirme sua senha"
                type="password"
                onChangeText={(text) => setConfirmPassword(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    ml={3}
                    mr={1.5}
                    size={6}
                    color="gray.300"
                  />
                }
              />

              <AlertMessage
                alerttype={alerttype}
                visible={visible}
                show={show}
                message={message}
              />
              <View mt={-1} width={"100%"} flexDir={"column"}>
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"row"}
                >
                  <CheckBox
                    size={18}
                    uncheckedColor={"#005B36"}
                    containerStyle={{
                      backgroundColor: "transparent",
                      padding: -5,
                      marginRight: -2,
                      marginBottom: 2,
                      marginLeft: -1,
                    }}
                    checkedColor={"#005B36"}
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                  />

                  <Text color="#005B36"> Eu li e concordo com os </Text>
                  <TermosdeUso />
                </Box>
                <Button
                  isLoading={loading}
                  isLoadingText="Enviando..."
                  borderRadius="24"
                  textAlign={"center"}
                  width={"100%"}
                  height={"16"}
                  bg="#DB4D37"
                  size="lg"
                  _text={{ fontWeight: "bold" }}
                  _pressed={{ backgroundColor: "#DB4D37", opacity: 0.5 }}
                  onPress={() => validation()}
                  mt={3}
                >
                  Criar conta
                </Button>
                <Button
                  mt={2}
                  borderRadius="10"
                  backgroundColor={"transparent"}
                  outli
                  px="10"
                  size="md"
                  _text={{
                    color: "#DB4D37",
                    fontWeight: "medium",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Voltar para Login
                </Button>
              </View>
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
  );
}