import { Stack, HStack, Button, Text, Input, Select, CheckIcon, Checkbox, View, Icon, Box, ScrollView } from 'native-base'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from 'react'
import ListaMunicipios from '../components/ListaMunicipios';

export default function GuiaMedicoHospitalarServicos({ navigation }) {
    const [service, setService] = useState();
    const [especialidade, setEspecialidade] = useState();

    const [botaoServico, setBotaoServico] = useState(true);
    const [botaoEmergencia, setBotaoEmergencia] = useState(false);



    return (
        
    <ScrollView w="100%">
      <Box bg='white' w='95%' h='93%' alignSelf='center' shadow={3} p={5} mt={5} borderRadius={15}>

            <Stack w="80%" h="100%" mx="auto" alignItems="center" justifyContent="flex-start" marginY="10">
                <HStack space={5}>
                    <Button
                        borderColor="gray.300"
                        borderWidth="2"
                        borderRadius="20" w="45%"
                        bg="white"
                        color="amber.100"
                        fontWeight="bold"
                        isPressed={botaoServico}
                        onPress={() => {
                            setBotaoServico(!botaoServico)
                            setBotaoEmergencia(!botaoEmergencia)
                        }}
                        _pressed={{
                            _text: { color: '#DB4D37' },
                            backgroundColor: 'white',
                            borderColor: '#DB4D37'
                        }}
                        _text={{ color: "gray.300" }}
                    >Serviços</Button>
                    <Button
                        borderColor="gray.300" borderWidth="2" borderRadius="20" w="45%" bg="white" fontWeight="bold"
                        isPressed={botaoEmergencia}
                        onPress={() => {
                            setBotaoServico(!botaoServico)
                            setBotaoEmergencia(!botaoEmergencia)
                        }}
                        _pressed={{
                            _text: { color: '#DB4D37' },
                            backgroundColor: 'white',
                            borderColor: '#DB4D37'
                        }}
                        _text={{ color: "gray.300" }} >Emergência</Button>
                </HStack>
                {botaoServico == true ? (
                    <Stack alignItems="center" justifyContent="flex-start">
                        <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Serviço</Text>
                        <Select borderColor="#DB4D37" borderRadius="10" bg="white" shadow={3} selectedValue={service} minWidth="100%" accessibilityLabel="Escolha uma opção:" placeholder="Selecione o tipo de serviço" _selectedItem={{
                            endIcon: <CheckIcon />
                        }} _light={{
                            bg: "white"
                        }}
                            onValueChange={itemValue => setService(itemValue)}>
                            <Select.Item label="Médicos" value="medicos" />
                            <Select.Item label="Cirurgiões Buco-maxilo-faciais" value="2" />
                            <Select.Item label="Laboratórios" value="3" />
                            <Select.Item label="Exames" value="4" />
                            <Select.Item label="Clínicas" value="5" />
                            <Select.Item label="Hospitais" value="6" />
                            <Select.Item label="Serviços de atendimento especializado" value="7" />
                        </Select>
                        {service == "medicos"
                            ?
                            <View>
                                <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Especilidade</Text>
                                <Select mt="2" borderColor="#DB4D37" borderRadius="10" bg="white" shadow={3} selectedValue={especialidade} minWidth="100%" accessibilityLabel="Escolha uma opção:" placeholder="Selecione a especialidade:" _selectedItem={{
                                    endIcon: <CheckIcon />
                                }} _light={{
                                    bg: "white"
                                }}
                                    onValueChange={itemValue => setEspecialidade(itemValue)}>
                                    <Select.Item label="Alergia e Imunologia" value="medicos" />
                                    <Select.Item label="Anestesiologia" value="2" />
                                    <Select.Item label="Angiologia" value="3" />
                                    <Select.Item label="Angiologia e Cirurgia Vascular" value="4" />
                                    <Select.Item label="Broncoesofalogia" value="5" />
                                    <Select.Item label="Cancerologia" value="6" />
                                    <Select.Item label="Cancerologia / Cancerologia Pediátrica" value="7" />
                                </Select>
                            </View>
                            : <></>
                        }

                        <Box flexDirection='column'>
                            <ListaMunicipios />

                            <Text alignSelf="flex-start" bold color="gray.800" fontSize="md">Prestador (opicional)</Text>
                            <Input borderColor="#DB4D37" borderRadius="10" bg="white" placeholder="Digite o nome do prestador" w="100%" />
                        </Box>
                    </Stack>
                ) : (
                    <Stack alignItems="center" justifyContent="flex-start">
                        <Text marginTop="5" alignSelf="flex-start" bold color="gray.800" fontSize="md">Tipo de atendimento</Text>
                        <Select borderColor="#DB4D37" borderRadius="10" bg="white" shadow={3} selectedValue={service} minWidth="100%" accessibilityLabel="Escolha uma opção:" placeholder="Selecione o tipo de serviço" _selectedItem={{
                            endIcon: <CheckIcon />
                        }} _light={{
                            bg: "white"
                        }}
                            onValueChange={itemValue => setService(itemValue)}>
                            <Select.Item label="teste1" value="teste1" />
                            <Select.Item label="teste2" value="teste2" />
                            <Select.Item label="teste3" value="teste3" />
                            <Select.Item label="teste4" value="teste4" />
                            <Select.Item label="teste5" value="teste5" />
                        </Select>

                        <Box flexDirection='column'>
                            <ListaMunicipios />

                            <Text alignSelf="flex-start" bold color="gray.800" fontSize="md">Prestador (opicional)</Text>
                            <Input borderColor="#DB4D37" borderRadius="10" bg="white" placeholder="Digite o nome do prestador" w="100%" />
                        </Box>
                    </Stack>
                )}

                <Checkbox marginY="5" maxWidth="80%" size="sm" value="test" _checked={{ bgColor: '#DB4D37', borderColor: '#DB4D37' }}>Exibir resultados em municípios próximos</Checkbox>

                <Button
                    borderRadius="20" bg="#DB4D37" shadow={3} px="20" size="lg"
                    _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }}
                >Buscar</Button>
            </Stack>
        </Box>
    </ScrollView>
    )
}

