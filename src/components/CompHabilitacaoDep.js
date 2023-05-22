import { Text, Button, Icon } from 'native-base';
import { MaterialIcons} from "@expo/vector-icons";

export function CompHabilitacaoDep(props) {
    const backgroundColor = props.backgroundColor;
    const navigation = props.navigation;
    const text = props.text;
    const onPress = props.onPress;
   
    return (
        <Button w="full" backgroundColor={backgroundColor} leftIcon={<Icon as={MaterialIcons} name="contact-page"  size="sm" color="gray.600" />} borderColor="#DB4D37" navigation={navigation} onPress={onPress}>
            <Text fontWeight="bold" color="#777">
                {text}
            </Text>
        </Button>
    )
}