import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Text, Box, FormControl, ScrollView, Stack, AlertDialog, Select, CheckIcon, VStack, HStack, IconButton, CloseIcon, Center, useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";

export default function EditarDados({ title, email, gender, company, phone, adress, zipcode, onChange }) {
  const navigation = useNavigation();

  const toast = useToast();
  const { userNome, userEmail, sexo, telefone, endereço, cep, userUid, setUserNome, setUserEmail, setSexo, setEmpresa, setTelefone, setEndereço, setCep } = useContext(AuthContext);
  const [userEmailNew, setUserEmailNew] = useState("");
  const [userNomeNew, setUserNomeNew] = useState("");
  const [userCepNew, setUserCepNew] = useState("");
  const [userSexoNew, setUserSexoNew] = useState("");
  const [userTelNew, setUserTelNew] = useState("");
  const [userEndNew, setUserEndNew] = useState("");

  const usersRef = firestore().collection("users");

  const updateUserData = async () => {
    try {
      await usersRef.doc(userUid).update({
        email: userEmailNew ? userEmailNew : userEmail,
        sexo: userSexoNew ? userSexoNew : sexo,
        cep: userCepNew ? userCepNew : cep,
        endereço: userEndNew ? userEndNew : endereço,
        //nome: userNome,
        telefone: userTelNew ? userTelNew : telefone,
      });
      console.log("Dados atualizados com sucesso no Firebase!");
      setUserEmail(userEmailNew ? userEmailNew : userEmail),
      setSexo(userSexoNew ? userSexoNew : sexo),
      setCep(userCepNew ? userCepNew : cep),
      setEndereço(userEndNew ? userEndNew : endereço),
      setTelefone(userTelNew ? userTelNew : telefone)
    } catch (error) {
      console.error("Erro ao atualizar dados no Firebase:", error);
    }
  };

  return (
    <ScrollView w="100%">
      <Box
        bg="white"
        w="95%"
        h="93%"
        alignSelf="center"
        shadow={3}
        p={5}
        mt={5}
        borderRadius={15}
      >
        <Stack w="100%" maxW="300px" mx="auto">
          <FormControl mb="5" mt={-5}>
            <Text>{title}</Text>

            <FormControl.Label>Email</FormControl.Label>
            <Input
              size={"md"}
              type="email"
              placeholder="Email"
              value={userEmailNew ? userEmailNew : userEmail}
              onChangeText={(text) => setUserEmailNew(text)}
              borderRadius={10}
            />

            <FormControl.Label mt={2}>Genêro</FormControl.Label>
            <Select
              minWidth="200"
              placeholder="Selecione o gênero"
              borderRadius={10}
              size={"md"}
              value={userSexoNew ? userSexoNew : sexo}
              onValueChange={(value) => setUserSexoNew(value)}
              _selectedItem={{
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              <Select.Item label="Masculino" value="Masculino" />
              <Select.Item label="Feminino" value="Feminino" />
              <Select.Item label="Não Binário" value="Não Binário" />
            </Select>

            <FormControl.Label mt={2}>Empresa</FormControl.Label>
            <Input
              color={"white"}
              borderRadius={10}
              size={"md"}
              placeholder="Empresa"
              value={"Saude"}
              //onChangeText={(text) => setUserE(text)}
              editable={false}
              bg={"#DB4D37"}
            />
            <FormControl.HelperText>
              A empresa não pode ser alterada
            </FormControl.HelperText>
            <FormControl.Label mt={2}>Telefone</FormControl.Label>
            <TextInputMask
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              value={userTelNew ? userTelNew : telefone}
              onChangeText={(text) => setUserTelNew(text)}
              placeholder={"Telefone"}
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                marginTop: 5,
                borderWidth: 1, // Adiciona a borda com uma largura de 1
                borderColor: "#ccc", // Define a cor da borda
                borderRadius: 5, // Define o raio da borda
                height: 45, // Define a altura do componente
                borderRadius: 10,
              }}
            />

            <FormControl.Label mt={2}>CEP</FormControl.Label>
            <TextInputMask
              type={"custom"}
              options={{
                mask: "99999-999",
              }}
              value={userCepNew ? userCepNew : cep}
              onChangeText={(text) => setUserCepNew(text)}
              placeholder={"CEP"}
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                marginTop: 5,
                borderWidth: 1, // Adiciona a borda com uma largura de 1
                borderColor: "#ccc", // Define a cor da borda
                borderRadius: 5, // Define o raio da borda
                height: 45, // Define a altura do componente
                borderRadius: 10,
              }}
            />

            <FormControl.Label mt={2}>Endereço</FormControl.Label>
            <Input
              size={"md"}
              borderRadius={10}
              placeholder="Endereço"
              value={userEndNew ? userEndNew : endereço}
              onChangeText={(text) => setUserEndNew(text)}
            />

            <Button
              onPress={() => {
                Alert.alert(
                  "Editar dados",
                  "Tem certeza que deseja editar os dados?",
                  [
                    {
                      text: "Cancelar",
                      style: "cancel",
                    },
                    {
                      text: "Salvar",
                      onPress: () => {
                        updateUserData();
                        toast.show({
                          title: "Dados salvos com sucesso!",
                          bg: "emerald.500",
                          shadow: 2,
                        });
                         navigation.navigate("Perfil")
                      
                      },
                    },
                  ]
                );
              }}
              bg={"#DB4D37"}
              mt={3}
              mb={3}
              borderRadius={10}
            >
              <Text color={"white"}>Salvar</Text>
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </ScrollView>
  );
}
