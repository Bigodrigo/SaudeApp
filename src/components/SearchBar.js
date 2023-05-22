import React, { useState, useEffect } from "react";
import { Input, Icon, Text, View, Modal, FlatList, Button, Center, List } from "native-base";
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome5, Ionicons, Entypo, FontAwesome, Fontisto, Feather } from "@expo/vector-icons";
import FlatListItemsBox from "./FlatListItemsBox";
import results from "./results";

// Barra de pesquisa na tela homepages
export function SearchBar(props) {
  const title = props.placeholderTitle;
  const [searchText, setSearchtext] = useState('');
  const [list, setList] = useState(results);
  const Clear = ((x) => setSearchtext(''));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  useEffect(() => {
    if(searchText !== ''){
    setList(
      results.filter(item => (
        item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(
          searchText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        ) > -1
      ))
    );
    }
}, [searchText]);

useEffect(() => {
  if (!isSearchOpen) {
    setSearchtext('');
    setList(results);
  }
}, [isSearchOpen]);

  return (
    <>
      <Center>
        <Button
          bg='#DB4D37'
          borderRadius={25}
          mt={0.4}
          onPress={() => setIsSearchOpen(true)}
          _pressed={{
            bg: 'coolGray.600:alpha.20'
          }}
        >
          <Icon as={<MaterialIcons name="search" />} size={4} color="gray.200" />
        </Button>
      </Center>
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} >
        <View bg='white' height="30%" position="absolute" top="0" left="0" right="0" bottom="0" opacity={0.9} >
          <View bg="white" py={0} px={0} flexDirection="row">
            <Button
              bg="white"
              alignSelf="center"
              onPress={() => setIsSearchOpen(false)}
              background={'white'}
            >
              <Icon as={<AntDesign name="arrowleft" />} size={5} color="#DB4D37" marginTop='4' background={'transparent'} />
            </Button>
            <Input
              backgroundColor='gray.100'
              borderRadius={5}
              value={searchText}
              onChangeText={(t) => setSearchtext(t)}
              fontSize='sm'
              placeholder={title}
              InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml="2" mr='-1' color="#DB4D37" />}
              InputRightElement={<Icon as={<MaterialIcons name="cancel" />} size={5} ml="2" mr='2' color="#DB4D37" onPress={Clear} />}
              height={35}
              shadow='2'
              mx={2}
              flex={1}
              marginTop={5}
              
            />
          </View>
          <View style={{backgroundColor: 'white', flex: 1, height:'100%'}}>
            {searchText.length === 0 ? null : <FlatListItemsBox borderRadius={0} rounded={0} horizontal={true} opacity1={0} opacity2={2} data={list}  />}
          </View>
        </View>
      </Modal>
    </>
  );
}