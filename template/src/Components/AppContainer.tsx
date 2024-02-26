import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../Utils/Colors';

interface AppContainerProps {
  backgroundColor: string;
  isTopSafeArea?: boolean;
  isBottomSafeArea?: boolean;
  bottomColor?: string;
  children: JSX.Element;
  containerStyle?: ViewStyle;
  childrenContainerStyle?: ViewStyle;
}

const AppContainer = (props: AppContainerProps) => {
  const {
    backgroundColor,
    isTopSafeArea,
    isBottomSafeArea,
    bottomColor,
    children,
    containerStyle,
    childrenContainerStyle,
  } = props;
  const TopComponent = isTopSafeArea ? SafeAreaView : View;
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View;
  return (
    <View style={[styles.container, containerStyle]}>
      <TopComponent style={{ backgroundColor }} />
      <View style={[styles.mainContainer, childrenContainerStyle]}>{children}</View>
      <BottomComponent style={{ backgroundColor: bottomColor }} />
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
});

AppContainer.defaultProps = {
  barStyle: 'dark-content',
  backgroundColor: Colors.primaryColor,
  bottomColor: 'transparent',
  isTopSafeArea: true,
  isBottomSafeArea: true,
};
