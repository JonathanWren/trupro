import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MarkdownView } from 'react-native-markdown-view';
import styles from '../component.style.js';
import * as Linking from 'expo-linking';

export const jobflexibility = {"O": "Fully Onsite",
"H": "Hybrid",
"R": "Fully Remote"}


function RoleView() {
    const title = useSelector(state => state.profile.viewRole.title);
    const salary = useSelector(state => state.profile.viewRole.salary);
    const location = useSelector(state => state.profile.viewRole.location);
    const jobType = useSelector(state => state.profile.viewRole.jobType);
    const description = useSelector(state => state.profile.viewRole.description);
    const flexibility = useSelector(state => state.profile.viewRole.flexibility);
    const nav = useNavigation();

    const handleApplyButtonPress = () => {
        console.log('here');
        nav.navigate('Apply');
    };

    // Render role view
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.centerView}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.roleTitle}>{title}</Text>
                        <Text style={styles.text}>{salary}</Text>
                        <Text style={styles.text}>{location} - {jobType} - {jobflexibility[flexibility]}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {handleApplyButtonPress()}}>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                    <MarkdownView styles={{listItemBullet: {
                        paddingRight: 10,
                        minWidth: 3,
                    },
                    paragraph: {
                        fontSize: 16,
                        lineHeight: 24,
                        color: 'rgb(36,36,36)',
                    },
                    listItem: {
                        flexDirection: 'row',
                      },
                      listItemOrderedContent: {
                        fontSize: 16,
                        lineHeight: 24,
                        color: 'rgb(36,36,36)',
                      },
                      listItemUnorderedContent: {
                        fontSize: 16,
                        lineHeight: 24,
                        color: 'rgb(36,36,36)',
                      },}}
                      onLinkPress={(url) => {
                        Linking.openURL(url).catch(error =>
                          console.warn('An error occurred: ', error),
                        )
                      }}>{description}</MarkdownView>
                    <TouchableOpacity style={styles.button} onPress={() => {handleApplyButtonPress()}}>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}


export default RoleView;
