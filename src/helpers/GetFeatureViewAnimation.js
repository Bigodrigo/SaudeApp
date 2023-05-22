export const getFeatureViewAnimation = (animatedValue) => {
  
    const translateY = {
      translateY: animatedValue.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 320],
        extrapolate: 'clamp',
      }),
    };
    return {
      
      // height: animatedValue.interpolate({
      //   inputRange:[8, 220, 240],
      //   outputRange:[220, 10, 0],
      //   extrapolate: 'clamp'
      // }),
      
      transform: [        
        translateY,
      ],
    };
  };