import React from 'react'
import { Stack, HStack, Button, Text, Input, Select, CheckIcon, Checkbox, Box, View, Icon } from 'native-base'
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function GuiaMedicoHospitalarEmergencia({ navigation }) {
    const [service, setService] = React.useState();

    return (
        <Box >
            <Stack w="80%" h="100%" mx="auto" alignItems="center" justifyContent="flex-start" marginY="10">
                <HStack space={5}>
                    <Button onPress={() => navigation.navigate('GuiaMedicoHospitalar')} borderColor="gray.300" borderWidth="2" borderRadius="20" w="45%" bg="white" fontWeight="bold" _text={{ color: "gray.300" }} _pressed={{backgroundColor: '#DB4D37', _text:{color: 'white'}}}>Serviços</Button>
                    <Button borderColor="#DB4D37" borderWidth="2" borderRadius="20" w="45%" bg="white" fontWeight="bold" _text={{ color: "#DB4D37" }} _pressed={{backgroundColor: '#DB4D37', _text:{color: 'white'}}}>Emergência</Button>
                </HStack>
                <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Tipo de atendimento</Text>
                <Select borderColor="#DB4D37" borderRadius="10" bg="white" shadow={3} selectedValue={service} minWidth="100%" accessibilityLabel="Escolha uma opção:" placeholder="Selecione o tipo de serviço" _selectedItem={{
                    endIcon: <CheckIcon />
                }} _light={{
                    bg: "white"
                }}
                    onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="teste1" value="teste" />
                    <Select.Item label="teste2" value="teste" />
                    <Select.Item label="teste3" value="teste" />
                    <Select.Item label="teste4" value="teste" />
                    <Select.Item label="teste5" value="teste" />
                </Select>
                <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Município</Text>
                <Input borderColor="#DB4D37" borderRadius="10" bg="white" mx="3" placeholder="Digite o nome do município" w="100%" />
                <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Prestador (opicional)</Text>
                <Input borderColor="#DB4D37" borderRadius="10" bg="white" placeholder="Digite o nome do prestador" w="100%" />

                <Checkbox marginY="5" maxWidth="80%" size="sm" value="test" _checked={{bgColor:'#DB4D37', borderColor: '#DB4D37'}}>Exibir resultados em municípios próximos</Checkbox>

                <Button borderRadius="20" bg="#DB4D37" shadow={3} px="20" size="lg">Buscar</Button>
            </Stack>
        </Box>
    )
}