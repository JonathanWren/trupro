//Screen with welcome message and button to continue

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Welcome = () => {
    const nav = useNavigation();

    return (
        <View style={localStyles.container}>
            <Text style={localStyles.heading}>Give recognition, show your reputation, progress your career</Text>
            {/* <Text style={localStyles.text}>Show case your reputation amoungst your peers and give recognition to those you trust.</Text> */}
            <Text style={localStyles.text}>TruPro is a reputation network for professionals. It allows you to commend to those you trust and showcase your reputation amongst your peers.</Text>
            <TouchableOpacity
                style={localStyles.button}
                onPress={() => {nav.navigate('Profile');}}>
                <Text style={localStyles.buttonText}>Join TruPro</Text>
            </TouchableOpacity>
        </View>
    );
}  

localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 25,
    },
    heading: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        margin: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '100%',
    },
    buttonText: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
    },
});


export default Welcome;

