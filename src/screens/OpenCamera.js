import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Box, Flex, Icon, Stack, Modal, CloseIcon, Image } from "native-base";
import { Camera } from "expo-camera";
import {  EvilIcons, MaterialIcons } from "@expo/vector-icons";

import { async } from "@firebase/util";
import { SafeAreaView, TouchableOpacity } from "react-native";



export default function OpenCamera() {

const camRef = useRef(null); 
const [hasPermission, setHaspermission] = useState(null);
const [capturedPhoto, setCapturedPhoto] = useState(null)
const [open, setOpen] = useState(false)

useEffect(() => {
    (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHaspermission(status === 'granted');
    })();
}, {});

if (hasPermission === null){
    return <View/>;
}
if (hasPermission === false){
    return <Text> Acesso negado! </Text>;
}

async function takePicture(){
    if(camRef){
        const data = await camRef.current.takePictureAsync()
        setCapturedPhoto(data.uri);
        setOpen(true);
        console.log(data);
    }
}


    return (
       <View flex={1} justifyContent='center'>
       
            
                <Camera focusDepth={1}  ref={camRef} flex={1} >

                <View bottom={5} 
                    alignItems='center' bgColor='transparent' mt='10' >           
              
                    </View> 
                    
                    <View flex={1} flexDirection='column-reverse' 
                    alignItems='center' bgColor='transparent' mb={10} >           
                    
                        <Button w='50%' height="10%" backgroundColor='gray.200' 
                        shadow='2' borderRadius='35' _pressed={{bgColor:'gray.300'}}
                        onPress={takePicture} >                      
                        <Icon as={EvilIcons} name="camera" color='black' size="5xl" /> 
                        </Button>
                    </View> 
                    
                </Camera>
                    
        { capturedPhoto &&
        <Modal        
        animationPreset='slide'
        flex={1}
        justifyContent='center'
        alignItems='center'
        transparent={false}
        bgColor='white'
        isOpen={open}>
            
            
            <Image width='320px' height='380px' lineHeight={50}
            alt="Foto Capturada" source={{ uri: capturedPhoto }} />
            <View flexDirection='row' mt={1}>
                <Button 
                mt={5} paddingTop={5} paddingBottom={5}
                backgroundColor='#DB4D37' _pressed={{bgColor:"#DB4D37.400"}}                                            
                onPress={ () => setOpen(false )} mr='4' width='20%' py={2}>
                    <MaterialIcons name="loop" size={24} color="white" />
                </Button>
                <Button 
                mt={5} paddingTop={5} paddingBottom={5}
                backgroundColor='#DB4D37' width='56%' _pressed={{bgColor:"#418c44"}}                                            
                >
                     <Text color='white' fontSize='14' bold>Usar Essa</Text>
                </Button>
            </View>
        </Modal>

        }
                                    
                        
                    
            
        
        </View>

    )

}