//Screen asking users to either click on a link to open the app
//

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';

const ClickLink = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please click the link you were sent when invited to join TruPro.</Text>
            <TouchableOpacity
                onPress={() => {nav.navigate('RequestLink');}}>
                <Text style={styles.smallPrint}>I do not have a link.</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ClickLink;