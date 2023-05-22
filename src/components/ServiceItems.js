import { Button as ButtonNativeBase, IButtonProps, Icon, IIconProps, Heading } from 'native-base';

export function ServiceItems({ title, iconFamily, iconName, navigation, navlink, aspectRatioValue, iconSize, headingSize, ...rest }) {
  return (
    <ButtonNativeBase
      rounded={10}
      padding={1}
      margin={2}
      alignItems='center'
      justifyContent='center'
      width={130}
      height={95}
      shadow={'items'}
      // borderColor={'#FCFCFC'}
      // borderWidth={'1'}
      _pressed={{opacity: 0.6}}
      style={{backgroundColor: '#FBFBFB'}}
      onPress={() => navigation.navigate(navlink)}
      {...rest}
    >
      <Icon
        as={iconFamily}
        name={iconName}
        color='#DB4D37'
        size={iconSize ?? 8}
        marginBottom={2}
        alignSelf='center'
        style={{aspectRatio: aspectRatioValue ?? 1 }}
      />
      <Heading size='sm' textAlign='center' fontWeight={'normal'} color={'#414A41'} fontSize={headingSize ?? 14}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}