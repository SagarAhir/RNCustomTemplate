import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Navigation from './src/Navigation/Navigation';
import { persistor, store } from './src/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './src/Components/ErrorBoundary';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Navigation />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
