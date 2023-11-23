
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../component.style.js';

const SignedUp = () => {
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.heading}>Thank you for signing up!</Text>
            <Text> We will now send you roles that are relevant to you that are advertised at companies where you will be recommended. You can customise what roles you will be sent in more detail on the next screen.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {nav.navigate('Request Link');}}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignedUp;
