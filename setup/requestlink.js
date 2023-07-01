//Screen asking users to either click on a link to open the app or enter their email address
//

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const RequestLink = () => {
    const nav = useNavigation();
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please either click the link you have already received inviting you to join TruPro, 
            or enter your email address below to receive a link inviting you to join TruPro.</Text>
            <Text style={styles.fieldInput}>Email address</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Profile');}}>
                <Text style={styles.buttonText}>Request Link</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RequestLink;