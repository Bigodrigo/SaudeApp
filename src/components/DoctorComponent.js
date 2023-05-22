import React from "react";
import { Box, Text, Icon, Flex, } from 'native-base'
import { Entypo, FontAwesome, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Linking } from "react-native";

export function DoctorComponent(props) {
    const title = props.title;
    const type = props.type;
    const phone = props.phone;
    const adress = props.adress
    
    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${adress}`;
        Linking.openURL(url);
    }

    const openWhatsApp = () => {
        Linking.openURL(`whatsapp://send?phone=${phone}&text=`);
    }

    //Amanda Pinto Sobrosa Lopes
    //Pediatra
    //9 9121-6108
    //Rua Gomes Jardim, 201 sala 708 - Santana, Porto Alegre - RS
    return (
        <Box backgroundColor='white' width='90%' padding={5} borderRadius={10} shadow={3} mb='5'>
            <Flex direction="column">
                <Box width='100%' alignItems='center'>
                    <Flex direction="row">
                        <Text ml="9" color="gray.400" bold fontSize={19}>{title}</Text>

                        <Icon as={Entypo} name="star" color='yellow.400' size={30} mr="0.5" mt="-0.5"/>
                        <Icon as={Entypo} name="star-outlined" color='amber.500' size={31} ml="-8" mt="-0.5"/>

                    </Flex>
                </Box>

                <Box alignItems='center'>
                    <Text color='gray.400' bold italic>{type}</Text>
                </Box>
                <Box width='112%' backgroundColor='gray.200' height='2px' mt='5' ml='-5' />

                <Box width='100%' my='5'>

                    <Flex direction="row">

                                            {/*Whatsapp icons */}
                    <Icon as={Entypo} name="phone" color='#DB4D37'      onPress={openWhatsApp}      size={25} mr="-7"   mt="4" />
                    <Icon as={FontAwesome} name="whatsapp" color='muted.200' onPress={openWhatsApp}      size={47} mr="-51"  mt="-0.6" />
                    <Icon as={Entypo} name="controller-record" color='#DB4D37' onPress={openWhatsApp}  size={49} mt="-0.5" mr="-1"/>
                    <Icon as={FontAwesome} name="whatsapp" color='muted.100' onPress={openWhatsApp}     size={45} ml="-10" />

                        <Text fontSize='18' color='#DB4D37' onPress={openWhatsApp} bold mt='2' ml='2'>{phone} </Text>
                    </Flex>
                </Box>

                <Box width='112%' backgroundColor='gray.200' height='2px' ml='-5' />

                <Box width='80%' mt="5" ml="-2">
                    <Flex direction="row">

                                            {/*Google Maps icons */}
                        <Icon as={Entypo} name="controller-record" color="muted.300" size={59} mt="-1" mr="-53" ml="-1"/>
                        <Icon as={Entypo} name="controller-record" color="muted.100" size={55} mt="-0.5" mr="-49" ml="-1"/>
                        <Icon as={MaterialCommunityIcons} name="google-maps" color="blue.400" onPress={openMaps} size={35} ml="1" mt="2" mr="4" />
                        <Text fontSize='16' color='blue.300' onPress={openMaps} bold>{adress}</Text>

                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}