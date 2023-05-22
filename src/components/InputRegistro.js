import React, { useState } from "react";
import { Input, Icon, Pressable} from 'native-base'
// import { MaterialIcons } from '@expo/vector-icons';

// const [showPassword, setShowPassword] = useState(false);

export function InputRegistro(props) {
    const placeholder = props.placeholder;
    const value = props.value;
    const onChangeText = props.onChangeText;
    const maxLength = props.maxLength;
    const type = props.type;
    const InputRightElement = props.InputRightElement;
    const InputLeftElement = props.InputLeftElement;

    return (
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            style={{ height: 55 }}
            size={'md'}
            shadow={'box'}
            borderRadius={'16'}
            borderColor={'#deedda'}
            isRequired={true}
            _focus={{ borderColor: '#005B36' }}
            mb={2}
            InputRightElement={InputRightElement}
            InputLeftElement={InputLeftElement}
        />
    )
}