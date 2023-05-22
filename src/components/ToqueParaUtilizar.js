import { Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const SwipeUpToOpen = (props) => {
  const animatedStyles = SCREEN_WIDTH < 350 ? 0 : useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(5, { duration: 100 }),
            withDelay(0, withTiming(0, { duration: 1000 })),
            withTiming(3)
          ),
          -1
        ),
      },
    ],
    opacity: withRepeat(
      withSequence(
        withTiming(0.2, { duration: 100 }),
        withDelay(0, withTiming(1, { duration: 1000 })),
        withTiming(0.5)
      ),
      -1
    ),
  }));


  // opacity: withRepeat(
  //   withSequence(
  //     withDelay(1000, withTiming(0.5)),
  //     withDelay(1000, withTiming(1))
  //   ),

  
  const text = props.text;

  return (
    <Animated.Text
      style={[
        {
          position: 'absolute',  
          color: "white",
          fontWeight: "400",
          alignSelf: "center",
          letterSpacing: 0.8,
          marginTop: 68,

        },
        animatedStyles,
      ]}
    >
    {text}
    </Animated.Text>
  );
};

export default SwipeUpToOpen;