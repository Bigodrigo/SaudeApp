import React from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import {Box} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#fff', white: '#fff'}

const slides = [
  { id: '1', image: require('../assets/app_saude.png'), 
    title: 'Bem - Vindo(a)',
    subtitle: 
    <Text>Encontre o que precisa com segurança{"\n"} 
    e facilidade, tendo acesso aos serviços mais {"\n"} 
    utilizados e resolvendo problemas de usabilidade.
    
    </Text>,
  },
  {
    id: '2',
    image: require('../assets/slide2.png'),
    title: 'Notificações',
    subtitle: <Text>
     Com as notificações ativada, não perca mais{"\n"}
     nenhuma atualização ou lembrete{"\n"}
     importante sobre seu plano.
    </Text>,
  },
    {
    id: '3',
    image: require('../assets/slide3.png'),
    title: 'Dispense o Cartão Físico',
    subtitle: <Text>
    Basta clicar no botão para ser direcionado{"\n"}
    para cima e começar a usar o seu cartão virtual{"\n"}
    em qualquer lugar, sem precisar do cartão físico.
    </Text>,
  },
  {
    id: '4',
    image: require('../assets/slide4.png'),
    title: 'Acesse Agora',
    subtitle: <Text>
    Faça sua autentificação agora mesmo{"\n"}
    e tenha acesso a todos os recursos que precisar{"\n"}
    na palma da mão.
    </Text>,
  },
];

const Slide = ({item}) => {
  return (
    <View alignItems='center'>
      
      <Image
        source={item?.image}
        style={{height: '100%', width, resizeMode: 'contain',  marginTop: -95
      }}
      />
    
      <View>
      <Box justifyContent='flex-start' alignItems='center' >
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle} numberOfLines={5}>{item?.subtitle}</Text>
      </Box>
      </View>

    </View>
  );
};

const Introducao = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.20,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicador de rolagem - container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: -10
          }}>
          {/* Renderização do indicador de rolagem */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#DB4D37',
                  width: 24,
                },
              ]}
            />
          ))}
        </View>

        {/* Funcionamento para os botões = Pular, Avançar */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 55}}>
              <TouchableOpacity
                style={[
                    styles.btn,
                    {
                      borderColor: "#FFF",
                      borderWidth: 1,
                      backgroundColor: '#DB4D37',
                  
                    },
                  ]}
                onPress={() => navigation.replace('Login')}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#FFF'}}>
                  COMEÇAR
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: "#FFF",
                    borderWidth: 1,
                    backgroundColor: '#DB4D37',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: "#FFF",
                  }}>
                  PULAR
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                    styles.btn,
                    {
                      backgroundColor: '#f89325',
                      borderColor: "#FFF",
                      borderWidth: 1,
                    
                    },
                  ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#FFF',
                  }}>
                  AVANÇAR
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary, marginTop: -10}}>
 <LinearGradient flex={1} colors={['#FCEAC5', '#FAB937', '#F58931']} locations={[0, 0.9, 1]} >
      <StatusBar backgroundColor="#DB4D37" />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: "#DB4D37",
    fontSize: 14,
    marginTop: 10,
    maxWidth: '110%',
    textAlign: 'center',
    lineHeight: 23,
    fontWeight: '800',
  },
  title: {
    color: '#DB4D37',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: -30
  },
  indicator: {
    height: 2.5,
    width: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 13,
    backgroundColor: '#DB4D37',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
});

export default Introducao;