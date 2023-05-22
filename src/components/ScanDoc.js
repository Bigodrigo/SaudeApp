import React from 'react';
import {Box, Icon, Flex,Button, Text} from 'native-base'
import { EvilIcons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { UploadFile } from '../screens/fileUpload'
import { useNavigation } from '@react-navigation/native'

export function ScanDoc() {
    const navigation = useNavigation();

   const openCan = async ()=>{
    await navigation.navigate("OpenCamera");
   }

    return (
        <Box data={openCan} alignItems='center' >
            <Button w='95%' backgroundColor='gray.200' shadow='2' borderRadius='35' mt='4' mb='2' py="2"
                navigation={navigation} onPress={openCan}>
                <Flex direction="row">
                    <Icon as={EvilIcons} name="camera" color='black' size="5xl" mr='5' />
                    <Text top="0.5" mt='11' mr='10' color='gray.500' bold fontSize='16'>Escanear Documentações</Text>
                </Flex>
            </Button>
            <Text fontSize='14' alignSelf='center' color='gray.500' bold> ou</Text>
        </Box>
        
    );


}