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
    const [type, setType] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Where would you like your career to go next?</Text>
            <Text style={styles.fieldInput}>Role</Text>
            <TextInput
                style={styles.input}
                placeholder="Role"
                onChangeText={(role) => {
                    setRole(role);
                }}
            />
            <Text style={styles.fieldInput}>Location</Text>
            <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={(location) => {
                    setLocation(location);
                }}
            />
            <Text style={styles.fieldInput}>Salary</Text>
            <TextInput
                style={styles.input}
                placeholder="Salary"
                onChangeText={(salary) => {
                    setSalary(salary);
                }}
            />
            <Text style={styles.fieldInput}>Job Type</Text>
            <TextInput
                style={styles.input}
                placeholder="Job Type"
                onChangeText={(Type) => {
                    setType(type);
                }}
            />
        </View>
    );
}

export default Opportunity;