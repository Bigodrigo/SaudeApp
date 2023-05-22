//Situação do Usuário, vincular com banco de dados e context! Sugestão Criar componente usuário com context!
import React, {useContext} from "react";
import { Text, View } from 'native-base'
import { AuthContext } from '../contexts/AuthContext';
import { formataNomeCartao } from '../helpers/utils'

export function UserPlanData(props) {
    const { title, title2, planclass, category, carencia, familyGroup } = props
    //const familyGroupLength = Object.keys(familyGroup).length
    const { familia } = useContext(AuthContext);
    return(
        <View>
            <Text color="#DB4D37" fontWeight="bold" fontSize={16} ml={4} mt={4} mb={1}>{title}</Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200">Classe Internação: <Text fontWeight="normal">{planclass}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4}>Categoria: <Text fontWeight="normal">{category}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200">Carências: <Text fontWeight="normal">{carencia}</Text></Text>
            {familia.length !== 0 ? 
            <>
                <Text color="#DB4D37" fontWeight="bold" fontSize={16} ml={4} mt={4} mb={1}>{title2}</Text>
                <Text color="gray.500" p={1} fontWeight="normal" pl={4} bg="gray.200">{formataNomeCartao(familia[0])}</Text>
                <Text color="gray.500" p={1} fontWeight="normal" pl={4} mb={1}>{formataNomeCartao(familia[1])}</Text> 
            </>
            :
            <>
                <Text color="#DB4D37" fontWeight="bold" fontSize={16} ml={4} mt={4} mb={1}>{title2}</Text>
                <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200"><Text fontWeight="normal">{familyGroup[0].name}</Text></Text>
                <Text color="gray.500" p={1} fontWeight="bold" pl={4} mb={1}><Text fontWeight="normal">{familyGroup[1].name}</Text></Text>
            </>
            }
        </View>
    )
}