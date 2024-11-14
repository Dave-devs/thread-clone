import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  close: () => void;
  backDropColor: string;
};

const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  close,
  backDropColor,
}: Props) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5]
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={() => close()}>
      <Animated.View
        style={[
          styles.container,
          backDropAnimation,
          { backgroundColor: backDropColor },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default BackDrop;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "none",
  },
});
