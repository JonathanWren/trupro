
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import Profile from '../main/profile.js';

const Signup = () => {
    const nav = useNavigation();

    const onComplete = () => {
        nav.navigate('Complete');
    }
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.centerView}>
                <Text style={styles.heading}>Welcome to TruPro</Text>
                <Text style={styles.text}>Complete the following information to start getting emailed roles that you are recommended for.</Text>
                <Profile inWizard={true} onComplete={onComplete} />
            </View>
        </ScrollView>
    </View>
  );
};

export default Signup;
