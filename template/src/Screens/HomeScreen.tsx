import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../Hooks/StoreHooks';

const HomeScreen = () => {
  const test = useAppSelector((state) => state);
  console.log('test: ', test);
  return (
    <View>
      <Text>{'demo'}</Text>
      <Pressable>
        <Text>{'Increment'}</Text>
      </Pressable>
      <Pressable>
        <Text>{'Decrement'}</Text>
      </Pressable>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    button: {
        padding: moderate
    }
});
