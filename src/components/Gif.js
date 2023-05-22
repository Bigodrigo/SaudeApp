import React from 'react';
import { Image } from 'native-base';

const Gif = ({ source}) => {
  return <Image source={source} shadow={10} alt="Imagem Carregamento" size={90} />;
  
};

export default Gif;