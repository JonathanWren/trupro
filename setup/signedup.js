
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { saveMainDetails } from '../redux/profileSlice.js';

const SignedUp = () => {
    const dispatch = useDispatch();
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.centerView}>
            <Text style={styles.heading}>Thank you for signing up!</Text>
            <Text style={styles.text}></Text>
            <Text> We will now send you roles that are relevant to you that are advertised at companies where you will be recommended. You can customise what roles you will be sent in more detail on the next screen.</Text>
            <Text></Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {dispatch(saveMainDetails({signed_up: true}));}}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
            </View>
      </ScrollView>
    </View>
  );
};

export default SignedUp;
