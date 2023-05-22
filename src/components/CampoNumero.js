import React, { useState } from 'react';
import { Box,FormControl,} from 'native-base'
import { TextInputMask } from 'react-native-masked-text'


export function CampoNumero(props) {
    const title = props.title;
    const value = props.value;
    const onChangeText = props.onChangeText;
    const type = props.type;
    return (
        <FormControl shadow={5} mt="2">
            <FormControl.Label ml={1}>{title}</FormControl.Label>
            <Box shadow="1">
                <TextInputMask  shadow={5} type={type} backgroundColor="white"
                    borderWidth={0} borderRadius={8} height={45}
                    paddingLeft={10} fontSize={15}
                    value={value} onChangeText={onChangeText}
                    style={{
                        borderRadius: 8,
                        shadowColor: 'black',
                        shadowRadius: 10,
                        elevation: 2,
                        
                        borderColor: 'black'
                    }}
                />
            </Box>
        </FormControl>
    )
}
