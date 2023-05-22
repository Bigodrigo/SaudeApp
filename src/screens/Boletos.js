import React, { useEffect, useState } from 'react'
import { Text, Select, CheckIcon, View, FlatList, Modal, FormControl, Input, Button, Pressable, Icon, Box } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import apiFetch from '../routes/api';
import SpinnerDefault from '../helpers/Spinner';

export default function Boletos({ navigation }) {
    const [matricula, setMatricula] = useState();
    const [showModal, setShowModal] = useState(false);
    const [nroBoleto, setNroBoleto] = useState();
    const [btnCopiar, setBtnCopiar] = useState('Copiar');
    function setNroBoletoFunction(nroboleto) {
        setShowModal(true)
        setNroBoleto(nroboleto)
    }
    const dadosBoletos = [
        {
            id: '1',
            valor: '99,90',
            status: 'Liquidado',
            vencimento: '01/01/2022',
            descricao: 'Boleto referente a parcela de Janeiro do seu plano atual.',
            nro_boleto: '13213215498 132151351321 54564684684 213213132121'
        },
        {
            id: '2',
            valor: '99,90',
            status: 'Liquidado',
            vencimento: '01/02/2022',
            descricao: 'Boleto referente a parcela de Janeiro do seu plano atual.',
            nro_boleto: '13213215498 132151351321 54564684684 213213132121'
        },
        {
            id: '3',
            valor: '99,90',
            status: 'Pendente',
            vencimento: '01/03/2022',
            descricao: 'Boleto referente a parcela de Janeiro do seu plano atual.',
            nro_boleto: '13213215498 132151351321 54564684684 213213132121'
        },
        {
            id: '4',
            valor: '99,90',
            status: 'Pendente',
            vencimento: '01/04/2022',
            descricao: 'Boleto referente a parcela de Janeiro do seu plano atual.',
            nro_boleto: '13213215498 132151351321 54564684684 213213132121'
        },
    ]
    return (
        <Box >
            <View bg='white' w='90%' h='100%' alignSelf='center' shadow={3} p={5} pb={30} mt={5} borderTopRadius={10}>
                <Text fontWeight='bold' fontSize={18} mb='5'>Informações financeiras:</Text>
                <Text fontSize='sm'>Selecione a matrícula:</Text>
                <Select mt="2" borderColor="#DB4D37" borderRadius="10" bg="white" shadow={3} selectedValue={matricula} minWidth="100%" accessibilityLabel="Escolha uma opção:" placeholder="Selecione a matrícula:" _selectedItem={{
                    endIcon: <CheckIcon />
                }} _light={{
                    bg: "white"
                }}
                    onValueChange={itemValue => setMatricula(itemValue)}>
                    <Select.Item label="Maria da Silva - 4752335" value="4752335" />
                    <Select.Item label="João da Silva  - 8547226" value="8547226" />
                </Select>
                {
                    dadosBoletos && matricula == '4752335' ?
                        <View>
                            <View flexDirection='row' bg='coolGray.200' mt={5} p={3} w='100%' borderTopRadius={10} borderBottomWidth={2} borderBottomColor='coolGray.100'>
                                <Text w='33%' color='coolGray.600'>Valor</Text>
                                <Text w='33%' color='coolGray.600'>Vencimento</Text>
                                <Text w='33%' color='coolGray.600' textAlign='right'>Status</Text>
                            </View>
                            <FlatList
                                data={dadosBoletos}
                                vertical
                                keyExtractor={(item, index) => index.toString()}
                                listKey={(item) => item.toString()}
                                renderItem={({ item }) => (
                                    <Pressable onPress={() => setNroBoletoFunction(item.nro_boleto)} shadow={2} flexDirection='row' bg={item.status == 'Pendente' ? 'red.200' : 'green.200'} mb={1} p={3} w='100%'>
                                        <Text w='33%' color='coolGray.600'>R$ {item.valor}</Text>
                                        <Text w='33%' color='coolGray.600'>{item.vencimento}</Text>
                                        <Text w='33%' color='coolGray.600' textAlign='right'>{item.status}</Text>
                                    </Pressable>
                                )}
                            />

                            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Linha digitável boleto:</Modal.Header>
                                    <Modal.Body>
                                        <FormControl>
                                            <FormControl.Label>Linha: </FormControl.Label>
                                            <Input value={nroBoleto} />
                                        </FormControl>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                setShowModal(false);
                                            }}>
                                                Cancelar
                                            </Button>
                                            <Button bg='#DB4D37' color='white' onPress={() => { setBtnCopiar('Copiado!') }}>
                                                {btnCopiar}
                                            </Button>
                                        </Button.Group>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                            <View justifyContent='center' alignItems='center' mt={5} >
                                <View display='flex' flexDirection='row' alignItems='center'>
                                    <Ionicons name="arrow-forward-circle-outline" size={20} color="black" />
                                    <Text ml={2}>
                                        Clique sobre os boletos para ter
                                    </Text>
                                </View>
                                <Text> acesso a linha digitável para pagamento</Text>
                            </View>
                        </View>
                        : matricula == null ? null
                            : <Text m={5} p={3} bg='red.400' color='white' borderRadius={10} fontWeight='bold' textAlign='center'>Não há informações sobre boletos para essa matrícula.</Text>
                }
            </View >
        </Box>

    )
}