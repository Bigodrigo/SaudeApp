import { Box, Heading } from 'native-base'

export function ItemsBox({ title, children, height, width, borderRadius ,...rest }) {
  return (
    <Box
      width={width} // passa a largura recebida por props
      height={height} // passa a altura recebida por props
      padding={3}
      rounded={25}
      borderRadius={borderRadius} // passa o borderRadius recebido por props
      shadow={'box'}
      borderColor={'#F2F2F2'}
      borderWidth={'1'}
      marginBottom={4}
      marginX={2}
      alignItems='center'
      style={{backgroundColor: '#FFFFFF'}}
      {...rest}
    >
      <Heading
        ml={2}
        fontSize='md'
        fontFamily={'heading'}
        fontWeight='medium'
        alignSelf='flex-start'
        color={'#667466'}
      >
        {title}
      </Heading>

      <Box
        flexDirection="row"
        justifyContent='space-between'
      >
        {children}
      </Box>
    </Box>
  )
}