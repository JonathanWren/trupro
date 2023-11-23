import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../component.style.js';

const LoadingScreen = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default LoadingScreen;
