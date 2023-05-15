//Screen that shows some text and asks for a verification code before proceeding
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Register = () => {
    const [code, setCode] = useState('');
    const nav = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Verification</Text>
        <Text style={styles.text}>Access to TruPro is by invitation only.</Text>
        <Text style={styles.text}>Please enter the verification code that you received when invited to join TruPro.</Text>
        <Text style={styles.text}>If you do not have a verification code then you need to find someone who is already a member 
        who can invite you. Try contacting colleagues on social media etc.</Text>
        <TextInput
            style={styles.input}
            placeholder="Verification Code"
            onChangeText={(code) => {
                setCode(code);
            }}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                nav.reset({
                    index: 0,
                    routes: [{ name: 'Profile' }],
                });
            }}
        >
            <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Register;