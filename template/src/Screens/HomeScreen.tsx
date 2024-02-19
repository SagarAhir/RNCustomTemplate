import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/StoreHooks';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { decrement, increment } from '../Store/CounterReducer';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const HomeScreen = () => {
  const { value } = useAppSelector((state) => state.counterSlice);
  const dispatch = useAppDispatch();
  const sharedValue = useSharedValue(responsiveFontSize(5));
  const sharedColorBoolean = useSharedValue(0);

  const handlePress = () => {
    sharedValue.value =
      sharedValue.value > responsiveFontSize(5)
        ? withTiming(sharedValue.value - responsiveFontSize(10))
        : withTiming(sharedValue.value + responsiveFontSize(10));
    sharedColorBoolean.value = sharedColorBoolean.value === 0 ? withTiming(1) : withTiming(0);
  };

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(sharedColorBoolean.value, [0, 1], ['grey', '#008080']);
    return {
      transform: [{ translateX: sharedValue.value }],
      backgroundColor,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      sharedColorBoolean.value,
      [0, 1],
      ['white', '#04080A'],
    );
    return {
      backgroundColor,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(sharedColorBoolean.value, [0, 1], ['black', 'white']);
    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {'Redux Toolkit Demo: '}
      </Animated.Text>
      <View style={styles.card}>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.text}>{'-'}</Text>
        </Pressable>
        <Text style={styles.valueText}>{value}</Text>
        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.text}>{'+'}</Text>
        </Pressable>
      </View>
      <Animated.Text style={[styles.title, animatedTextStyle]}>{'Reanimated Demo: '}</Animated.Text>
      <View style={styles.card}>
        <Animated.View style={[styles.animatedView, animatedStyles]} />
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>{'Change theme'}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: 'dodgerblue',
    borderRadius: responsiveFontSize(10),
    marginVertical: responsiveScreenHeight(1),
  },
  text: {
    color: Colors.white,
  },
  valueText: {
    color: Colors.black,
    textAlign: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: Colors.black,
    marginVertical: responsiveHeight(0.5),
  },
  card: {
    elevation: 10,
    backgroundColor: '#ABDDFF',
    borderRadius: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    marginVertical: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animatedView: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    borderRadius: responsiveFontSize(55),
    alignSelf: 'center',
    marginVertical: responsiveHeight(1),
    elevation: 10,
  },
});
