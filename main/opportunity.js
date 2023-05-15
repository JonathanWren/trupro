//Screen asking questions about what roles they are looking for
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Opportunity = () => {

    const nav = useNavigation();

    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>What role are you looking for?</Text>
            <TextInput
                style={styles.input}
                placeholder="Role"
                onChangeText={(role) => {
                    setRole(role);
                }}
            />
            <Text style={styles.heading}>Where do you want to work?</Text>
            <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={(location) => {
                    setLocation(location);
                }}
            />
            <Text style={styles.heading}>What salary are you looking for?</Text>
            <TextInput
                style={styles.input}
                placeholder="Salary"
                onChangeText={(salary) => {
                    setSalary(salary);
                }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setRegistered(true);
                    nav.reset({
                        index: 0,
                        routes: [{ name: 'Reputation' }],
                    });
                }}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Opportunity;