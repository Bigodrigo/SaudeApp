import React from "react";
import { Box, Text,Icon, Flex, } from 'native-base'
import { Ionicons,Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Dimensions } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  } = Dimensions.get('window');

export function BoxClinicasHopistais(props) {
    const title = props.title;
    const phone = props.phone;
    const phone2 = props.phone;
    const adress = props.adress
   
    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${adress}`;
        Linking.openURL(url);
    }
    const callPhone = () => {
        const url = `tel:${phone}`;
        Linking.openURL(url);
    }

    return (
        <Box width='90%' backgroundColor='white' borderRadius={10} shadow={3} mt='6' alignItems='center'>
            <Flex direction="row" py={5} px={10}>
                <Text fontSize='20' mr={3} ml="7" bold color='gray.400'>{title}</Text>
                <Icon as={Entypo} name="star" color='yellow.400' size={34} mr="-0.5" />
                <Icon as={Entypo} name="star-outlined" color='amber.500' size={34} ml="-8"/>

            </Flex>

            <Box width='100%' backgroundColor='gray.200' height='2px' />

            <Box width='100%' ml={ SCREEN_WIDTH < 350 ? -20 : -120} mr={-3} py={5} alignItems='center'>
                <Flex direction="row">
                    <Icon as={Entypo} name="controller-record" color="muted.300" size={59} mt="-1" mr="-21" ml="-9" />
                    <Icon as={Entypo} name="controller-record" color="muted.100" size={55} mt="-0.5" mr="-57" ml="-9" />
                    <Icon as={Ionicons} name="call" color='#DB4D37' size={7}  ml="4" mt="3" mr="5"/>
                             <Text onPress={callPhone} fontSize='16' bold color="#DB4D37" mt="3">{phone}</Text>
                            
                </Flex>
            </Box>

            <Box width='100%' backgroundColor='gray.200' height='2px' />

            <Box width='90%' p={5} alignItems='center'>
                <Flex direction="row">
                <Icon as={Entypo} name="controller-record" color="muted.300" size={59} mt="-1" mr="-53" ml="-1"/>
                <Icon as={Entypo} name="controller-record" color="muted.100" size={55} mt="-0.5" mr="-49" ml="-1"/>
                <Icon as={MaterialCommunityIcons} name="google-maps" color="blue.400" size={35} ml="1" mt="2" mr="4" onPress={openMaps}/>
                               <Text onPress={openMaps} fontSize='16' color="blue.300" bold>{adress} </Text>
                </Flex>
            </Box>
        </Box>
    );
}
//Rua Doutor Castro Menezes, 155- Vila Assunção, Porto Alegre - RS//Rua Doutor Castro Menezes, 155- Vila Assunção, Porto Alegre - RS