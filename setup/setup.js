//Screen of instructions for how to setup the app and a button to continue

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Setup = () => {
    
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>You are now TruPro member!</Text>
            <Text style={styles.heading}>How it works.</Text>
            <Text style={styles.text}>1. Show up to 25 colleagues who are good at their job that you respect them.</Text>
            <Text style={styles.text}>2. Get recognised in return.</Text>
            <Text style={styles.text}>3. Coming soon, use your reputation to get ahead in your career.</Text>
            <Text style={styles.smallPrint}>You should invite people you know and whose professional judgement you trust 
            as the more trustworthy your contacts the higher your own reputation.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Trusted Colleagues');}}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Setup;