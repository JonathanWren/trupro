//Screen to allow entering name and job title and validate that are completed before continuing
//
import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../component.style.js';
import Profile from './profile.js';

const ProfileScreen = () => {    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Profile inWizard={false}/>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;