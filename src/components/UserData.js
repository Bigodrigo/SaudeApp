//Informações Pessoais, precisa ser atualizado dependendo do usuário logado, isso se conecta com o banco de dados e o context!! Sugestão Juntar o context com user
import React, {useState} from "react";
import { Text, View } from 'native-base'


export function UserData(props) {
    const { title, email, gender, company, phone, adress, zipcode } = props
   
    return(
        <View >
            <Text color="#DB4D37" fontWeight="bold" fontSize={16} ml={4} mt={4}>{title} </Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200">E-mail: <Text fontWeight="normal">{email}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4}  >Sexo: <Text fontWeight="normal">{gender}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200">Empresa: <Text fontWeight="normal">{company}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4}  >Telefone: <Text fontWeight="normal">{phone}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} bg="gray.200">Endereço: <Text fontWeight="normal">{adress}</Text></Text>
            <Text color="gray.500" p={1} fontWeight="bold" pl={4} borderBottomWidth={1} borderBottomColor="gray.200" >CEP: <Text fontWeight="normal">{zipcode}</Text></Text>            
        </View>
    )
}