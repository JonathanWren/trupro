//Screen with welcome message and button to continue

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Welcome = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to TruPro</Text>
            <Text style={styles.heading}>For Trusted Professionals</Text>
            <Text style={styles.text}>TruPro allows you to connect your trusted contacts to both find great roles
            that are not available elsewhere and also to find great talent based on character and rather than 
            keyword matches. 
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Register');}}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}   

export default Welcome;

