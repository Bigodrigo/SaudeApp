import React from "react";
import { Box, Text, ScrollView, View,Icon, Input } from 'native-base'
import { SearchBar } from "../components/SearchBar";
import { BoxClinicasHopistais } from "../components/BoxClinicasHospitais";
import { DoctorComponent } from "../components/DoctorComponent";
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome5, Ionicons, Entypo, FontAwesome, Fontisto, Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function ProfissionaisFavoritos({navigation}) {
    
    const [searchText, setSearchtext] = useState('');
    const Clear = ((x) => setSearchtext(''));

    return (
        <ScrollView width="100%" backgroundColor='#eee'>
            <View alignItems='center' pb={5}>
                {/* barra de pesquisa*/}
                <Box padding={5}>
                <Input
                    backgroundColor='gray.200'
                    borderRadius={5}
                    mt={2}
                    value={searchText}
                    onChangeText={(t) => setSearchtext(t)}
                    fontSize='sm'
                    placeholder={'Pesquise aqui'}
                    w="full"
                    InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml="2" mr='-1' color="#DB4D37" />}
                    InputRightElement={<Icon as={<MaterialIcons name="cancel" />} size={5} ml="2" mr='2' color="#DB4D37" onPress={Clear} />}
                    height={35}
                    shadow='2'
                />
                </Box>

                <Box shadow={3} backgroundColor='white' width='100%' padding={2} alignItems='center' mb={5}>
                    <Text color='#DB4D37' bold fontSize={16}>
                        Médicos
                    </Text>
                </Box>

                {/*Medicos e seus horarios */}
               <DoctorComponent title={"Amanda Pinto Sobrosa Lopes"} type={"Pediatra"}  phone={"(51) 9 9121-6108"} adress={"Rua Gomes Jardim, 201 sala 708 - Santana, Porto Alegre - RS"}   />

                <Box shadow={3} my={5} backgroundColor='white' width='100%' padding={2} alignItems='center'>
                    <Text color='#DB4D37' bold fontSize={16}>
                        Clínicas e Hospitais
                    </Text>
                </Box>

                 {/*Clinicas e hospitais */}
                <BoxClinicasHopistais title={"Hospital da Brigada Militar de Porto Alegre"} phone={"(051) 3288-3500"} phone2={"(051) 3288-3509"}  adress={"Rua Doutor Castro Menezes, 155 -       Vila Assunção, Porto Alegre - RS"} />
                <BoxClinicasHopistais title={"Hospital São Lucas da       PUCRS"} phone={"(51) 3288-3509"} adress={"Avenida Ipiranga, 6690 - Partenon,       Porto Alegre - RS"} />
            </View>
        </ScrollView>
    );
}