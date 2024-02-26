import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/Navigation';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import Animated from 'react-native-reanimated';

type DemoScreenProps = NativeStackScreenProps<RootStackParamList, 'Demo'>;

const DemoScreen = ({ navigation }: DemoScreenProps) => {
  return (
    <Animated.View style={styles.container}>
      <Animated.View style={styles.card} sharedTransitionTag='test1'>
        <Animated.Image
          source={{
            uri: 'https://picsum.photos/200',
          }}
          style={styles.image}
        />
        <Pressable style={styles.button} onPress={() => navigation.navigate('Demo')}>
          <Text style={styles.text}>{'Go To Demo screen'}</Text>
        </Pressable>
      </Animated.View>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>{'Go Back'}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(15),
    backgroundColor: Colors.white,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    elevation: 10,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(10),
  },
  text: {
    color: Colors.white,
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(10),
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
});
