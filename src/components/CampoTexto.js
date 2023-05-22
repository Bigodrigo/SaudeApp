import { Box, Input,FormControl} from 'native-base'



export function CampoTexto(props) {
    const title = props.title;
    const value = props.value;
    const onChangeText = props.onChangeText;
    const keyboardType = props.keyboardType;
    return (
            <FormControl shadow={5} mt="2">
                <FormControl.Label ml={1}>{title}</FormControl.Label>
                <Box shadow="1">
                    <Input backgroundColor="white"
                        borderRadius={10}
                        borderWidth={0} height={45} shadow="1"
                        fontSize={15}
                        value={value} onChangeText={onChangeText}  keyboardType={keyboardType}/>
                </Box>
            </FormControl>
        
    );

}