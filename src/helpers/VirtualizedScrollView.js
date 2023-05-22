import React, { useRef, useCallback } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { IconButton, View } from "native-base";
import { FontAwesome, Entypo,  MaterialIcons } from "@expo/vector-icons";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

function VirtualizedScrollView (props) {
 
  const scrollViewRef = useRef(null);

  const scrollParaPosicaoDefault = useCallback(() => {
    if (scrollViewRef.current != null) {
      setTimeout(() => {
        scrollViewRef.current.scrollToOffset({
          offset: 90,
          animated: true,
        });
      }, 50);
    }
  }, []);

  if( SCREEN_WIDTH < 350 ){

  } else {
    useFocusEffect(scrollParaPosicaoDefault);
  }
  

  const handleScrollDown = () => {
    scrollViewRef.current.scrollToOffset({ y: 50 });
  };
  
    return (
      <>
      
      <AnimatedFlatList
      ref={scrollViewRef}
      {...props}
      scrollEventThrottle={18}
      keyExtractor={(item, index) => `dom-${index}`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => 
      <>
      { SCREEN_WIDTH < 350 ? null : <IconButton
       _pressed={{opacity: 0.5}}
       opacity={0.8} 
       onPress={handleScrollDown} 
       alignSelf={'center'} 
       position={'absolute'} 
       bgColor={'amber.400'} 
       rounded={'full'} 
       backgroundColor={'transparent'} 
       width={'30%'}
       zIndex={5}
       style={{top: 255, }}
         icon={<MaterialIcons name="keyboard-arrow-down" size={32} color="#DB4D37" />} 

     />
      }
       

      {props.children}
      </>}
      style={styles.scroll}
      >
        
      </AnimatedFlatList>
      
      </>
      
      
  );
};

export default VirtualizedScrollView;

const styles = StyleSheet.create({
    scroll: {
      zIndex: -1,
    },
});