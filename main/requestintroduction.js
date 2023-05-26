//Screen showing the name, role and company for a contact then a button to request an introduction from Adriano Basso
//
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';

const RequestIntroduction = ({route}) => {
    const { contact } = route.params;

    const handleAdd = () => {
        alert("request an introduction from Adriano Basso")
    }

    return (
        <View style={[styles.container, {flexDirection: 'column', alignContent: 'flex-start'}]}>
            <Text style={styles.contactName}>
                {contact?.name}
            </Text>
            <Text style={localStyles.emailText}>
                {contact.role ? contact.role + ' at ' + contact.company : ''}
            </Text>
            <Text style={styles.text}>You have not yet been introduced to {contact?.name}. 
            Your mutual connection is Adriano Basso. Request an introduction below</Text>
            <TouchableOpacity onPress={() => handleAdd()} style={styles.button}>
                <Text style={styles.buttonText}>Request Introduction</Text>
            </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
    emailText: {
        fontSize: 12,
        color: colors.darkGray,
    },
});

export default RequestIntroduction;
