//Screen to allow entering name and job title and validate that are completed before continuing
//
import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles, { colors } from '../component.style.js';
import { updateFirstName, updateLastName} from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import config from '../main/config.js';

const Profile = ({route}) => {
    const dispatch = useDispatch();

    const firstName = useSelector(state => state.profile.mainDetails.firstName); 
    const lastName = useSelector(state => state.profile.mainDetails.lastName);

    const saveProfile = () => {
        var dataToSend = {first_name: firstName, last_name: lastName};
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(config.BASE_URL + 'saveprofile?' + formBody, {
            method: 'GET',
        })
        .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
        });
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.fieldInput}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    placeholderTextColor={colors.fieldPlaceHolderTextColor}
                    defaultValue={firstName}
                    onEndEditing={(name) => {
                        dispatch (
                            updateFirstName({firstName: name.nativeEvent.text})
                        )
                    }}
                />
                <Text style={styles.fieldInput}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    placeholderTextColor={colors.fieldPlaceHolderTextColor}
                    defaultValue={lastName}
                    onEndEditing={(name) => {
                        dispatch (
                            updateLastName({lastName: name.nativeEvent.text})
                        )
                    }}
                />
                {/* <Text style={styles.fieldInput}>Where do you live?</Text>
                <Text
                    style={[styles.input, !location && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Location');
                    }}
                >{location ? location : 'Location'}
                </Text> */}
                {route.params.inWizard &&
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {            
                            //Validate that name and job title are completed
                            if (firstName === '') {
                                alert('Please complete your first name');
                                return;
                            }
                            if (lastName === '') {
                                alert('Please complete your last name');
                                return;
                            }

                            saveProfile();
                        }}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </View>
    );
}

export default Profile;