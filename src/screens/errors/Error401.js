import { View, Text, Button } from 'native-base'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react'

export default function Error401() {
    const { logout } = useContext(AuthContext);

    return (
        <View p={10} alignItems='center'>
            <Text fontSize='lg' fontWeight='bold'>Erro 401 - Não autorizado.</Text>
            <Text fontSize='md' marginY={5}>Sua sessão expirou, por favor utilize o botão abaixo para fazer novamente seu login.</Text>
            <Button borderRadius="20" borderWidth="2" borderColor="white" px="10" bg="#DB4D37" size="lg" onPress={logout}>Login</Button>
        </View>
    )
}