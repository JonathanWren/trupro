//Screen asking users to either click on a link to open the app or enter their email address
//

import React, {useRef} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import {updateEmail, updatePhoneNumber, updateCountryCode, updateCountryNumber } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const RequestLink = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const email = useSelector(state => state.profile.mainDetails.email);
    const phoneNumber = useSelector(state => state.profile.mainDetails.phoneNumber);
    const countryCode = useSelector(state => state.profile.mainDetails.countryCode);
    // const location = useSelector(state => state.profile.mainDetails.location);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please enter your email address or phone number below to receive a link inviting you to join TruPro.</Text>
            <Text style={styles.fieldInput}>Email address</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                onEndEditing={(email) => {
                    dispatch (
                        updateEmail({email: email.nativeEvent.text})
                    )
                }}
                defaultValue={email}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // if ((email === '' || !email) && (phoneNumber === '' || !phoneNumber)) {
                    //     alert('Please complete either your email address or phone number');
                    //     return;
                    // }
                    
                    nav.navigate('Profile');}}>
                <Text style={styles.buttonText}>Request Link</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RequestLink;