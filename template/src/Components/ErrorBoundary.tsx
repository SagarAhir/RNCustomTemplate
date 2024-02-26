import React, { ErrorInfo, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppContainer from './AppContainer';
import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { reset } from '../Navigation/NavigationServices';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    console.log('getDerivedStateFromError: ', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.log('Error boundary: ', error, errorInfo);
  }

  handleOnPress() {
    this.setState({ hasError: false });
    reset({ index: 1, routes: [{ name: 'Home' }] });
  }

  render() {
    if (this.state.hasError) {
      return (
        <AppContainer>
          <View style={styles.errorContainer}>
            <View style={styles.cardContainer}>
              {/* <Image style={styles.image} source={Images.somethingWrong} /> */}
              <Text style={CommonStylesFn.text(4.5, Colors.primaryColor)}>
                {'Something went wrong : ('}
              </Text>
              <Text style={[CommonStylesFn.text(3, Colors.black), styles.subText]}>
                {'We are working on fixing the problem. Please reload the app and try again !'}
              </Text>

              <TouchableOpacity style={styles.buttonStyle} onPress={this.handleOnPress}>
                <Text style={CommonStylesFn.text(3.5, Colors.white)}>{'Reload App'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AppContainer>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  subText: {
    marginVertical: verticalScale(15),
  },
  image: {
    resizeMode: 'contain',
    height: moderateScale(300),
    width: moderateScale(300),
  },
  cardContainer: {
    elevation: 10,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(15),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  buttonStyle: {
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
});
