//Screen to allow entering name and job title and validate that are completed before continuing
//
import React, { useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Profile = ({route}) => {
    const nav = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
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
                    onChangeText={(firstName) => {
                        setFirstName(firstName);
                    }}
                />
                <Text style={styles.fieldInput}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    onChangeText={(lastName) => {
                        setLastName(lastName);
                    }}
                />
                <Text style={styles.fieldInput}>Where do you live?</Text>
                <Text
                    style={[styles.input, !route.params && {color: '#d9d9d9'}]}
                    onPress={() => {
                        nav.navigate('Location');
                    }}
                >{route.params ? route.params?.location : 'Location'}
                </Text>
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
            </ScrollView>
        </View>
    );
}

export default Profile;