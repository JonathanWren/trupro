//Screen to allow entering name and job title and validate that are completed before continuing
//
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles, { colors } from '../component.style.js';
import { saveMainDetails} from '../redux/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from "expo-checkbox";

const Profile = (props) => {
    const dispatch = useDispatch();

    const firstName = useSelector(state => state.profile.mainDetails.firstName); 
    const lastName = useSelector(state => state.profile.mainDetails.lastName);
    const hasLinkedIn = useSelector(state => state.profile.mainDetails.hasLinkedIn);
    const linkedInProfileURL = useSelector(state => state.profile.mainDetails.linkedInProfileURL);
    const currentRoleTitle = useSelector(state => state.profile.mainDetails.currentRole);

    const checkboxChange = (checked) => {
        dispatch (
            saveMainDetails({has_linked_in: !checked})
        )
    }
    
    return (
        <View>
            <Text style={styles.fieldInput}>First name</Text>
            <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                defaultValue={firstName}
                onChangeText={(name) => {
                    dispatch (
                        saveMainDetails({first_name: name})
                    )
                }}
            />
            <Text style={styles.fieldInput}>Last name</Text>
            <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                defaultValue={lastName}
                onChangeText={(name) => {
                    dispatch (
                        saveMainDetails({last_name: name})
                    )
                }}
            />
            <Text style={styles.fieldInput}>LinkedIn Profile URL</Text>
            <TextInput
                style={styles.input}
                placeholder="LinkedIn Profile URL"
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                defaultValue={linkedInProfileURL}
                onChangeText={(url) => {
                    dispatch (
                        saveMainDetails({linkedin_profile_url: url})
                    )
                }}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox value={!hasLinkedIn} 
                    onValueChange={(checked) => checkboxChange(checked)}
                    color={!hasLinkedIn ? 'blue' : undefined}
                />
                <Text style={styles.checkboxText} onPress={() => checkboxChange(hasLinkedIn)}>I do not have a LinkedIn Account</Text>
            </View>
            <Text style={styles.fieldInput}>Current or Most Recent Job Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Job Title"
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                defaultValue={currentRoleTitle}
                onChangeText={(text) => {
                    dispatch (
                        saveMainDetails({job_title: text})
                    )
                }}
            />
            
            {props.inWizard &&
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
                        if (hasLinkedIn && (linkedInProfileURL === '' || !linkedInProfileURL)) {
                            alert('Please complete your LinkedIn Profile URL');
                            return;
                        }
                        if (currentRoleTitle === '' || !currentRoleTitle) {
                            alert('Please complete your Job Title');
                            return;
                        }
                        props.onComplete();
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default Profile;