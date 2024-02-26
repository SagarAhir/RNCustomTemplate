import { Alert, DevSettings, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/StoreHooks';
import { moderateScale, verticalScale, scale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { decrement, increment } from '../Store/CounterReducer';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/Navigation';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { value } = useAppSelector((state) => state.counterSlice);
  const dispatch = useAppDispatch();
  const sharedValue = useSharedValue(moderateScale(15));
  const sharedColorBoolean = useSharedValue(0);

  const handlePress = () => {
    sharedValue.value =
      sharedValue.value > moderateScale(15)
        ? withTiming(sharedValue.value - moderateScale(80))
        : withTiming(sharedValue.value + moderateScale(80));
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
        <Pressable
          style={styles.button}
          onPress={() => {
            DevSettings.addMenuItem('Show Secret Dev Screen', () => {
              Alert.alert('Showing secret dev screen!');
            });
            dispatch(decrement());
          }}
        >
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
      <Animated.Text style={[styles.title, animatedTextStyle]}>{'Navigation Demo: '}</Animated.Text>
      <Animated.View style={styles.card} sharedTransitionTag='test1'>
        <Animated.Image
          source={{
            uri: 'https://picsum.photos/200',
          }}
          style={styles.image}
          // sharedTransitionTag='test2'
        />
        <Pressable style={styles.button} onPress={() => navigation.navigate('Demo')}>
          <Text style={styles.text}>{'Go To Demo screen'}</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: 'dodgerblue',
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(10),
  },
  text: {
    color: Colors.white,
  },
  valueText: {
    color: Colors.black,
    textAlign: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: moderateScale(16),
    marginVertical: verticalScale(5),
  },
  card: {
    elevation: 10,
    backgroundColor: '#ABDDFF',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animatedView: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    alignSelf: 'center',
    marginVertical: verticalScale(1),
    elevation: 10,
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(10),
  },
});
