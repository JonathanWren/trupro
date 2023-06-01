//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const Role = ({route}) => {

    const nav = useNavigation();

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
                    nav.navigate("Next Move", {opportunity: {...route.params.opportunity, role: "Product Management"}});
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Role;