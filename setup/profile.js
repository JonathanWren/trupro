//Screen to allow entering name and job title and validate that are completed before continuing
//
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import { updateFirstName, updateLastName } from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Profile = ({route}) => {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const firstName = useSelector(state => state.profile.mainDetails.firstName); 
    const lastName = useSelector(state => state.profile.mainDetails.lastName);
    const location = useSelector(state => state.profile.mainDetails.location);
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* <Text style={styles.fieldInput}>Email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                    keyboardType="email-address"
                />
                <Text style={styles.fieldInput}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    onChangeText={(phoneNumber) => {
                        setPhoneNumber(phoneNumber);
                    }}
                    keyboardType="phone-pad"
                /> */}
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
                <Text style={styles.fieldInput}>Where do you live?</Text>
                <Text
                    style={[styles.input, !location && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Location');
                    }}
                >{location ? location : 'Location'}
                </Text>
                {route.params.inWizard &&
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {            
                            //Validate that name and job title are completed
                            if (firstName === '') {
                                alert('Please complete your first name');
                                return;
                            }

                            nav.navigate('Employment');
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