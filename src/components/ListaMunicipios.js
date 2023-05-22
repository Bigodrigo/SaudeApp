import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {StyleSheet,  TouchableOpacity } from 'react-native';
import { Box, Text, View } from 'native-base';

export default function ListaMunicipios() {
    const [isState, SetIsState] = useState([]);
    const [isSuggestion, setIsSuggestion] = useState([]);
    const [cidadeInput , setCidadeInput] = useState([]);
    const [zindex , setZindex] = useState(0);
    const [cidadeNome , setCidadeNome] = useState('');

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios')
            .then((res) => res.json())
            .then((json) => {
                SetIsState(json)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])
    // alert(JSON.stringify(isState));
    const _searchText = (text) => {
        let matches = [];
        if (text) {
            matches = isState.filter(res => {
                const regex = new RegExp(`${text.trim()}`, 'i');
                return res.nome.match(regex);
            });
            // console.log(text)
            setZindex(1)
            setCidadeInput([])
            setIsSuggestion(matches);
        } else {
            setIsSuggestion([]);
        }
    }

    return (
        <Box flexDirection='column' mb='-32' marginTop='4' zIndex={zindex} >
        <Text  alignSelf="flex-start" bold color="gray.800" fontSize="md">Município</Text>

        <View h='48' >
            
            <Autocomplete
                autoCapitalize='none'
                autoCorrect={false}
                containerStyle={styles.container}
                inputContainerStyle={styles.inputContainerStyle}
                style={styles.searchcontainer}
                listStyle={styles.listStyle}
                placeholder='Digite o nome do municipio '
                onChangeText={(text) => _searchText(text)}
                data={isSuggestion}
                
                flatListProps={{
                    renderItem: ({ item }) =>
                    <View>
                        <TouchableOpacity style={styles.listContainer} onPress={() => {
                            // SetIsState([])
                            setCidadeInput([])
                            setCidadeInput(item)
                            setZindex(0)
                            setIsSuggestion([])
                            setCidadeNome(item.nome)


                        }}>
                            <Text style={styles.listTitle}> {item.nome}</Text>
                        </TouchableOpacity>
                        </View>

                }}

            >{cidadeInput.nome}</Autocomplete>
        </View>
      
    </Box>
    
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'


    },
    searchcontainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#DB4D37',
        borderRadius: 10,
        padding: 8,
        paddingLeft:14 ,
        fontSize: 12,
      
    },
    inputContainerStyle: {
        borderWidth: 0,


    },
    listStyle: {
        backgroundColor: 'white',

    },
    listTitle: {
        fontSize: 15,
        marginBottom: 5,
        marginTop: 5

    },
    listContainer:{
        backgroundColor: 'white',
      
       
      }
});
  
