import { Button as ButtonNativeBase, IButtonProps, Icon, IIconProps, Heading } from 'native-base';

export function ServiceItems({ title, iconFamily, iconName, navigation, navlink, aspectRatioValue, iconSize, headingSize, ...rest }) {
  return (
    <ButtonNativeBase
      backgroundColor='white'
      rounded={10}
      padding={0}
      margin={1}
      alignItems='center'
      justifyContent='center'
      width={110}
      height={110}
      shadow={2}
      onPress={() => navigation.navigate(navlink)}
      {...rest}
    >
      <Icon
        as={iconFamily}
        name={iconName}
        color='#DB4D37'
        size={iconSize ?? 5}
        marginBottom={0}
        alignSelf='center'
        style={{aspectRatio: aspectRatioValue ?? 1 }}
      />
      <Heading size='sm' textAlign='center' fontSize={headingSize ?? 14}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}