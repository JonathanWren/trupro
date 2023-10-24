//Screen asking the user to click the link or enter the code below, and listens for the link to be clicked

import React, {useContext, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import styles, { colors } from '../component.style.js';
import { updateDeviceCode, updateDeviceID, updateUsersID, updateVerificationCode } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import config from '../main/config.js';

const ClickLink = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const email = useSelector(state => state.profile.mainDetails.email);
    const verificationCode_saved = useSelector(state => state.profile.mainDetails.verificationCode);  
    const [verificationCode, setVerificationCode] = useState(verificationCode_saved);

    const verifyCode = () => {
        setloading(true);

        var dataToSend = {email: email, token: verificationCode};
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(config.BASE_URL + 'validateemailtoken?' + formBody, {
            method: 'GET',
        })
        .then(response => {
            if(response.status == 401){
                alert('This code is invalid please try again');
                setloading(false);
            } else if (!response.ok){
                alert('Failed to validate code. Please try again later.');
                setloading(false);
            } else {
                response.json()
                .then((json) => {
                    dispatch (
                        updateDeviceID(json.device_id),
                        updateDeviceCode(json.device_code),
                        updateUsersID(json.users_id),
                        updateVerificationCode('')
                    )
                })
                .catch((error) => {
                    console.error(error);
                    alert('There was an error validating the code. Please try again later.');
                })
                .finally(() => {
                    setloading(false);
                });
            }
        })
        .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
            setloading(false);
        })
    }

    useEffect(() => {
        if(verificationCode_saved != ''){
            verifyCode();
        }
    }, [verificationCode_saved]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>You should now receive an email from us with a link to verify your email.</Text>
            <Text style={styles.text}>Click the link in this email to continue or enter the code received below.</Text>

            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                onChangeText={(verificationCode) => {
                    setVerificationCode(verificationCode);
                }}
                defaultValue={verificationCode}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    verifyCode();
                }}
                    >
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            </ScrollView>
            {loading &&
                <View style={styles.loading}>
                <ActivityIndicator size='large' />
                </View>
            }
        </View>
    );
}

export default ClickLink;