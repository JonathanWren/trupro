//Screen asking what the applicant's role is, which company they work for and when they started there
//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Role = ({route}) => {
    
        const nav = useNavigation();
    
        const [role, setRole] = useState('');
        const [stillInRole, setStillInRole] = useState(false);
    
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is your current or most recent role?</Text>
                <Text style={styles.fieldInput}>Role</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Role"
                    onChangeText={(role) => {
                        setRole(role);
                    }}
                />
                <Text style={styles.fieldInput}>Organisation</Text>
                <Text
                    style={[styles.input, !route.params && {color: '#d9d9d9'}]}
                    onPress={() => {
                        nav.navigate('Organisation');
                    }}
                >{route.params ? route.params?.organisation : 'Organisation'}
                </Text>
                <View style={styles.checkboxContainer}>
                <CheckBox value={stillInRole} onValueChange={(checked) => setStillInRole(checked)}
                color={stillInRole ? 'blue' : undefined}/>
                <Text style={styles.checkboxText} onPress={() => setStillInRole(!stillInRole)}>Are you still in this role?</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (role === '' || !route.params) {
                            alert('Please enter your role and organisation');
                            return;
                        }

                        nav.navigate('Verification');
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }

export default Role;