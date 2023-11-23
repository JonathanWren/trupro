
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import Profile from '../main/profile.js';
import { useDispatch } from 'react-redux';
import { setSignedUp } from '../redux/profileSlice.js';

const Signup = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const onComplete = () => {
        dispatch(setSignedUp({signed_up: true}));
        nav.navigate('Complete');
    }
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.heading}>Welcome to TruPro</Text>
            <Text style={styles.text}></Text>
            <Profile inWizard={true} onComplete={onComplete} />
        </ScrollView>
    </View>
  );
};

export default Signup;
