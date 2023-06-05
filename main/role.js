//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { updateNextTitle } from '../redux/profileSlice.js';

const Role = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Role</Text>
            <Text style={styles.text}>Trupro is initially launching for users in product management. Further roles will be added soon.</Text>
            <Text
                    style={styles.input}
                >Product Management
            </Text>
            <TouchableOpacity

                style={styles.button}
                onPress={() => {
                    dispatch(updateNextTitle({title: "Product Management"}));
                    nav.navigate("Next Move");
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Role;