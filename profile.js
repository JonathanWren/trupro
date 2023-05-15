//Screen to allow entering name and job title and validate that are completed before continuing
//
import React, { useState, useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './component.style.js';
import { RegisterContext } from './setup/context.js';

const Profile = () => {
    const nav = useNavigation();
    const { setRegistered } = useContext(RegisterContext);

    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>What is your email address?</Text>
            <TextInput

                style={styles.input}
                placeholder="Email Address"
                onChangeText={(email) => {
                    setEmail(email);
                }}
            />
            <Text style={styles.heading}>What is your name?</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(name) => {
                    setName(name);
                }}
            />
            <Text style={styles.heading}>What is your current or most recent job title?</Text>
            <TextInput
                style={styles.input}
                placeholder="Job Title"
                onChangeText={(jobTitle) => {
                    setJobTitle(jobTitle);
                }}
            />
            <Text style={styles.heading}>What is your current or most recent company?</Text>
            <TextInput
                style={styles.input}
                placeholder="Company"
                onChangeText={(company) => {
                    setCompany(company);
                }}
            />
            <Text style={styles.heading}>Where do you live?</Text>
            <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={(location) => {
                    setLocation(location);
                }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {            
                    //Validate that name and job title are completed
                    if (name === '' || jobTitle === '') {
                        alert('Please complete your name and job title');
                        return;
                    }

                    setRegistered(true);
                }}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;