//Screen asking users to either click on a link to open the app or enter their email address
//

import React, {useRef} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import PhoneInput from "react-native-phone-number-input";
import {updateEmail, updatePhoneNumber, updateCountryCode, updateCountryNumber } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const RequestLink = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const email = useSelector(state => state.profile.mainDetails.email);
    const phoneNumber = useSelector(state => state.profile.mainDetails.phoneNumber);
    const countryCode = useSelector(state => state.profile.mainDetails.countryCode);
    // const location = useSelector(state => state.profile.mainDetails.location);
    const phoneInput = useRef(null);

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
            <Text style={styles.fieldInput}>Phone number</Text>
            <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode={countryCode}
                layout="second"
                onChangeCountry={(country) => {
                    dispatch (updateCountryNumber({countryNumber: country['callingCode'][0]}));
                    dispatch (updateCountryCode({countryCode: country['cca2']}));
                    console.log('Country number: ' + country['callingCode'][0]);
                    console.log('Country code; ' + country['cca2']);
                }}
                onChangeText={(number) => {
                    dispatch (updatePhoneNumber({phoneNumber: number}));
                    console.log('Phone number: ' + number);
                }}
                textInputStyle={[styles.input, {borderBottomLeftRadius: 0, borderTopLeftRadius: 0, fontSize: 14,}]}
                textContainerStyle={{paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0, width: "100%", backgroundColor: colors.appBackgroundColor}}
                countryPickerButtonStyle={[styles.input, {width: 70, borderBottomRightRadius: 0, borderTopRightRadius: 0, fontSize: 14,}]}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if ((email === '' || !email) && (phoneNumber === '' || !phoneNumber)) {
                        alert('Please complete either your email address or phone number');
                        return;
                    }

                    if (phoneNumber != ''){
                        phoneNumberNoLeadingZero = phoneInput.current.getNumberAfterPossiblyEliminatingZero()['number'];
                        if (phoneNumber != phoneNumberNoLeadingZero) {
                            console.log(phoneNumberNoLeadingZero);
                            dispatch (
                                updatePhoneNumber({phoneNumber: phoneNumberNoLeadingZero})
                            )
                        }

                        if(!phoneInput.current.isValidNumber(phoneNumberNoLeadingZero)) {
                            alert('Please enter a valid phone number');
                            return;
                        }
                    }
                    
                    nav.navigate('Profile');}}>
                <Text style={styles.buttonText}>Request Link</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RequestLink;