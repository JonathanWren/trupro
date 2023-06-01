//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const RoleLocation = ({route}) => {

    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Location</Text>
            <Text style={styles.text}>Trupro is initially launching for users in London, UK. Further locations will be added soon.</Text>
            <Text
                    style={styles.input}
                >London, UK
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    nav.navigate("Next Move", {opportunity: {...route.params.opportunity, location: "London, UK"}});
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RoleLocation;