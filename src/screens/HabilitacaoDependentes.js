//Esta pág faz parte da Habilitação de dependentes, ela poderia se juntar às outras em componentes ou em um case switch!!
//Além disso é interessante rever o código e ver se é possível simplificar!!
import { MaterialIcons} from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import {  Box,  Text,  Link,    View,  VStack,  Button, Icon, ScrollView} from 'native-base';
import InformacoesImportantes from '../components/InformacoesImportantes';
import { CompHabilitacaoDep } from '../components/CompHabilitacaoDep';

export default function HabilitacaoDependentes({ navigation }) {
  const opcoes = [
    { name: "Filho(a) recém-nascido(a)", navlink: 'FilhoRecemNasc'},
    { name: "Filhos(as) menores de 18 anos", navlink: 'HabilitacaoDeFilho' },
    { name: "Filhos(as) estudantes de 18 a 24 anos", navlink: 'HabilitacaoFilhos24'},
    { name: "Cônjuges civilmente casados", navlink: 'ConjugeCasados'},
    { name: "Ex-cônjuge com pensão alimentícia", navlink: 'ExConjuge'},
  ];

  return (
    <ScrollView w="100%">
    <Box bg='white' w='95%' h='93%' alignSelf='center' shadow={3} p={5} mt={5} borderRadius={15}>
    <View width="100%" backgroundColor="gray.100" mb={5} rounded={5}>
      <VStack mb={1} backgroundColor="#fff" p={4}>
        <Text color="#DB4D37.400" fontSize={14} fontWeight="bold">
          Habilitações que não exigem processo:
        </Text>
        <Text color="gray.500" fontSize={10}>
          Selecione o grau de dependência desejado.
        </Text>
      </VStack>
      <VStack mb={3} data={opcoes}>
  <Box borderWidth={1} shadow={5} rounded={5} borderColor="#DB4D37.400">
    <CompHabilitacaoDep  backgroundColor={'#fff'} navigation={navigation} text={'Filho(a) recém-nascido(a)'} onPress={() => navigation.navigate('FilhoRecemNasc')} 
    InputRightElement={<Icon as={<MaterialIcons name="cancel" />} size={5} ml="2" mr='2' color="#DB4D37" />}
    />
  </Box>
  <Box borderWidth={1} shadow={5} rounded={5} mt={1}  borderColor="#DB4D37.400">
    <CompHabilitacaoDep backgroundColor={'#fff'} navigation={navigation} text={'Filhos(as) menores de 18 anos'} onPress={() => navigation.navigate('HabilitacaoDeFilho')} />
  </Box>
  <Box borderWidth={1} shadow={5} rounded={5}  mt={1} borderColor="#DB4D37.400">
    <CompHabilitacaoDep  backgroundColor={'#fff'} navigation={navigation} text={'Filhos(as) estudantes de 18 a 24 anos'} onPress={() => navigation.navigate('HabilitacaoFilhos24')} />
  </Box>
  <Box borderWidth={1} shadow={5} rounded={5}  mt={1} borderColor="#DB4D37.400">
    <CompHabilitacaoDep backgroundColor={'#fff'} navigation={navigation} text={'Cônjuges civilmente casados'} onPress={() => navigation.navigate('ConjugeCasados')} />
  </Box>
  <Box borderWidth={1} shadow={5} rounded={5}  mt={1} borderColor="#DB4D37.400">
    <CompHabilitacaoDep backgroundColor={'#fff'} navigation={navigation} text={'Ex-cônjuge com pensão alimentícia'} onPress={() => navigation.navigate('ExConjuge')} />
  </Box>
</VStack>


      <InformacoesImportantes/>

    </View>
    </Box>
    </ScrollView>
  );
}
