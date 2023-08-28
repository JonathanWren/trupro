//Screen asking users to either click on a link to open the app or enter their email address
//

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import {updateEmail } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import config from '../main/config.js';

const RequestLink = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const email = useSelector(state => state.profile.mainDetails.email);
    const [loading, setloading] = useState(false);
    // const location = useSelector(state => state.profile.mainDetails.location);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please enter your email address below.</Text>
            <Text style={styles.text}>You should enter the email that you use to sign into the TruPro slack group if you are part of this group.</Text>
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
                    if ((email === '' || !email)) {
                        alert('Please enter an email address');
                        return;
                    }

                    setloading(true);

                    var dataToSend = {email_address: email};
                    var formBody = [];
                    for (var key in dataToSend) {
                        var encodedKey = encodeURIComponent(key);
                        var encodedValue = encodeURIComponent(dataToSend[key]);
                        formBody.push(encodedKey + '=' + encodedValue);
                    }
                    formBody = formBody.join('&');
                    fetch(config.BASE_URL + 'requestemailverification?' + formBody, {
                        method: 'GET',
                    })
                    .then((response) => {
                        if(response.status !== 200){
                            alert('There was an error sending the email. Please try again later.');
                        } else {
                            nav.navigate('Click Link');
                        }
                    })
                    .catch((error) => {
                        console.log("here")
                        alert(JSON.stringify(error));
                        console.error(error);
                    })
                    .finally(() => {
                        setloading(false);
                    });
                }}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            {loading &&
                <View style={styles.loading}>
                <ActivityIndicator size='large' />
                </View>
            }
        </View>
    );
}

export default RequestLink;