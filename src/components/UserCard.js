//Cartão Pessoal, precisa ser atualizado dependendo do usuário logado, isso se conecta com o banco de dados e o context!! Sugestão Juntar o context com user
import { Text, Flex, Box, Icon } from 'native-base'
import { ImageBackground, Dimensions, PixelRatio } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { formataCartao, formataNomeCartao } from '../helpers/utils'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import * as Animatable from 'react-native-animatable';


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function normalize(size, based = 'width') {
  const newSize = (based === 'height') ?
    size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const heightPixel = (size) => {
  return normalize(size, 'height');
};
const fontPixel = (size) => {
  return heightPixel(size);
};

export function UserCard() {
  const { logout, userNome, userEmail, sexo, telefone, endereço, cep, setUserMatricula, familia, setFamilia, setSexo, setEmpresa, setTelefone, setEndereço, setCep} = useContext(AuthContext);
  const cartao = '12.34567890.12.3' //formataCartao(userMatricula, '##.########.##.#')
  const nome = userNome //formataNomeCartao(userNome);
  return (
    <Animatable.View animation="fadeInDown" delay={5} iterationCount="1">
    <ImageBackground
      source={require('../assets/cartao_.png')}
      resizeMode='stretch'
      style={{ width: 0.83 * SCREEN_WIDTH, height: 4 / 8 * SCREEN_WIDTH, maxWidth: 400 }}
      borderRadius={10}
    >
      <Flex marginBottom={55} padding={4} flexDirection='row' justifyContent={'space-between'}>
        <Box display='flex' flexDirection='row'>
          <Box left='auto'>
          </Box>
        </Box>
        <Icon as={MaterialCommunityIcons} name='contactless-payment' size='md' color={'white'} />
      </Flex>


      <Flex direction='row' width='100%' padding={4} >
        <Flex direction='column' marginRight={6}>
          <Text color='white' fontSize={fontPixel(20)} lineHeight={fontPixel(40)} fontFamily='virtualCard' fontWeight={'600'} >
            {cartao}
          </Text>

          <Text color='white' fontSize={fontPixel(16)} fontFamily='virtualCard' fontWeight={'400'}>
            {nome}
          </Text>
        </Flex>
        <Flex direction='column'>
          <Text color='white' fontSize={fontPixel(16)} lineHeight={fontPixel(40)} fontFamily='virtualCard' fontWeight={'400'}>
            01/01/1975
          </Text>

          <Text color='white' fontSize={fontPixel(16)} fontFamily='virtualCard' fontWeight={'400'}>
            PLUS
          </Text>
        </Flex>
      </Flex>
    </ImageBackground>
    </Animatable.View>
  );
}