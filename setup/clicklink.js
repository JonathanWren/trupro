//Screen asking the user to click the link or enter the code below, and listens for the link to be clicked

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../component.style.js';
import { validateEmailToken, updateVerificationCode } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const ClickLink = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const verificationCode = useSelector(state => state.profile.authenticationDetails.verificationCode); 

    const verifyCode = () => {
        setloading(true);

        dispatch(
            validateEmailToken()
        )
        .then((response) => {
            if(response.type != 'profile/validateEmailToken/fulfilled'){
                if(response.payload == "Invalidtoken"){
                    alert("Invalid token");
                } else {
                    alert("Failed to validate token")
                }
            }
        })
        .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
        })
        .finally(() => {
            setloading(false);
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>You should now receive an email from us with a link to verify your email.</Text>
            <Text style={styles.text}>Click the link in this email to continue or enter the code received below.</Text>

            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                onChangeText={(verificationCode) => {
                    dispatch(
                        updateVerificationCode({verificationCode: verificationCode})
                    );
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