// Date: 21/07/21
// Creator: Liam Blake
// Summary: Component for displaying a job in a list
//
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import style, { colors } from '../component.style.js';

const JobsListItem = ({ item }) => {
    const nav = useNavigation();

    const navigateToJobDetails = (job) => {
        nav.navigate('Job Details', { job: job});
    }

    return (
        <View style={localStyle.jobContainer}>
            <TouchableOpacity style={localStyle.jobRow} onPress={() => navigateToJobDetails(item)}>
                <View style={localStyle.jobImageContainer}>
                    <Image source={{ uri: 'https://s2.googleusercontent.com/s2/favicons?sz=32&domain=' + item.companyURL }} style={{ width: 32, height: 32 }} />    
                </View>
                <View style={localStyle.jobDetails}>
                    <Text style={localStyle.jobTitle}>{item.name}</Text>
                    <Text style={localStyle.jobLocation}>{item.location}</Text>
                    <Text style={localStyle.jobSalary}>{item.salary}</Text>
                    <Text style={localStyle.jobCompany}>{item.companyName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }

  const localStyle = StyleSheet.create({
    jobContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    jobRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    jobDetails: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    jobLocation: {
        fontSize: 14,

        color: colors.text,
    },
    jobSalary: {
        fontSize: 14,

        color: colors.text,
    },
    jobCompany: {
        fontSize: 14,

        color: colors.text,
    },
});

export default JobsListItem;