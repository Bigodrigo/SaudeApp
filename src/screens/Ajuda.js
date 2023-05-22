import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Center, ScrollView, Text, View, Input, Icon, Button, Divider,  } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import FAQ from '../components/FAQ';
import { useState, useEffect } from 'react';


const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={200} />
      <Transition.Change />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState(FAQ);
  

  const linkExt = useCallback(() => {
    Linking.openURL("https://www.google.com")
  }, [])


  const Clear = () => {
    setFilteredFAQ(FAQ);
    setSearchTerm('');
  }
  
  
  const handleSearch = text => {
    setSearchTerm(text);
    const filtered = FAQ.filter(item => {
      return (
        item.duvida.toLowerCase().includes(text.toLowerCase()) ||
        item.resposta.toString().toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredFAQ(filtered);
  };

//#f1f5f9
  return (
    
      <Center flex={1}>
        <View width='100%' >
          <Box px={5} mb='5'  >
            <Text ml={1} fontFamily='title2' fontSize={26} color='gray.600'>
              Perguntas Frequentes
            </Text>
            <Input
        backgroundColor='gray.200'
        borderRadius={10}
        mt={2}
        value={searchTerm}
        onChangeText={handleSearch}
        fontSize='sm'
        placeholder={'Pesquise a sua duvida'}
        placeholderTextColor="gray.500"
        w="full"
        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml="2" mr='-1' color="#DB4D37" />}
        InputRightElement={<Icon as={<MaterialIcons name="cancel" />} size={5} ml="2" mr='2' color="#DB4D37" onPress={Clear} />}
        height={35}
        shadow='2'
         />
          </Box>
          <Divider mb={1}/>
          <ScrollView width='100%' height='55%'>
            
              <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.container}
              >
                
                {filteredFAQ.map(({ duvida, resposta }, index) => {
                  return (
                    <TouchableOpacity
                      key={duvida}
                      onPress={() => {
                        ref.current.animateNextTransition();
                        setCurrentIndex(index === currentIndex ? null : index);
                      }}
                      style={styles.cardContainer}
                      activeOpacity={0.9}
                    >
                      
                      <View style={styles.card}>
                        <Text style={styles.heading}>{duvida}</Text>
                        
                        {index === currentIndex && (
                          <View style={styles.subCategoriesList}>
                            
                            {resposta.map((resposta) => (
                              <Text key={resposta} style={styles.body}>
                                {resposta}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
                
              </Transitioning.View>
            
          </ScrollView> 
                <Divider mt={1}/>
        
        <Box px={5} mt='3'>
            <Text
            alignSelf={'center'} fontFamily='title2' fontSize={16} color='gray.400'>
              Não encontrou o que precisava?
            </Text>
            <Button alignSelf={'center'} onPress={linkExt}  mt={1} borderRadius='full' height={16} 
            width='75%' bgColor='#DB4D37' _pressed={{backgroundColor: '#DB4D37', opacity: 0.5}}>
            <Text fontFamily='title' fontSize={16} color='white' lineBreakMode=''>

              Atendimento Online
            </Text>
            </Button>
          </Box>
          </View> 
      </Center>
    
 
  );
}

// 200: '#fbfbfb',
// 250: '#f8f8f8',
// 300: '#d4d4d4',
// 500: '#706f6f',
// 800: '#3c3c3b'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  cardContainer: {
    paddingTop: 16,
    paddingBottom: 16,
     marginBottom: 3,
    //borderBottomWidth: 7,
    // borderColor: '#fbfbfb',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  card: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    marginLeft: 10, 
    color: '#706f6f',
  },
  body: {
    fontSize: 14,    
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    color: '#706f6f',
  },
  subCategoriesList: {
    marginTop: 10,
  },
});