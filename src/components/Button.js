import { Button as ButttonNativeBase, Text } from "native-base";

export function Button({ title, navlink, navigation, color = '#667466', ...rest }) {

  return (
    <ButttonNativeBase
      rounded={100}
      bg='white'
      marginRight={2}
      marginBottom={2}
      shadow={'items'}
      
      
      onPress={() => navigation.navigate(navlink)}
      {...rest}
    >
      <Text
        fontFamily='heading'
        fontSize='md'
        color={color}
      >
        {title}
      </Text>
    </ButttonNativeBase >
  )
}