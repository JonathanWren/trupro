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
            <Text style={styles.text}>To start building your reputation, you can invite up to three contacts to join.</Text>
            <Text style={styles.text}>To do this click continue and select from your phone contacts who you trust.</Text>
            <Text style={styles.text}>You should invite people you know and whose professional judgement you trust 
            as the more trustworthy your contacts the higher your own reputation.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Invite Contact');}}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Setup;