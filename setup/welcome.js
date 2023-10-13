//Screen with welcome message and button to continue

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const nav = useNavigation();

    return (
        <View style={localStyles.container}>
            <Text style={localStyles.heading}>Give recognition, show your reputation, progress your career</Text>
            <Text style={localStyles.text}>TruPro is a reputation network for professionals. It allows you to recommend colleagues you trust, get recommended in return and showcase your reputation amongst your peers.</Text>
            <TouchableOpacity
                style={localStyles.button}
                onPress={() => {nav.navigate('Request Link');}}>
                <Text style={localStyles.buttonText}>Join TruPro</Text>
            </TouchableOpacity>
        </View>
    );
}  

const localStyles = StyleSheet.create({
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

