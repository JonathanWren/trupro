//Screen asking the user to click the link or enter the code below, and listens for the link to be clicked

import React, {useRef} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';

const ClickLink = () => {
    const nav = useNavigation();

    

    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You should now receive an email from us with a link to verify your email.</Text>
            <Text style={styles.text}>Click the link in this email to continue or enter the code received below.</Text>

            <Text style={styles.fieldInput}>Verification Code</Text>
            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                keyboardType="number-pad"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    nav.navigate('Next Move');}}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

        </View>
    );
}

export default ClickLink;