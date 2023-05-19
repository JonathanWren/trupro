//Screen that shows some text and asks for a verification code before proceeding
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../component.style.js';
import { RegisterContext } from './context.js';

const Register = () => {
    const [code, setCode] = useState('');
    const [showText, setShowText] = useState(false);
    const { setRegistered } = useContext(RegisterContext);

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Verification</Text>
        <Text style={styles.fieldInput}>Please enter the verification code that you received when invited to join TruPro.</Text>
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
                setRegistered(true);}}
        >
            <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowText(!showText)}>
            <Text style={styles.smallPrint}>How do I get a code?</Text>
        </TouchableOpacity>
        {showText && 
        <View>
        <Text style={styles.text}>Access to TruPro is by invitation only.</Text>
        <Text style={styles.text}>If you have been invited to join TruPro then your code 
        will be in the original email or text message invitation that you received</Text>
            <Text style={styles.text}>If you do not have a verification code then you need to find someone who is already a member 
            who can invite you. Try contacting colleagues on social media etc.</Text>
            </View>
        }
    </View>
  );
};

export default Register;