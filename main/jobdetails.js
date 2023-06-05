//Screen showing the details of a job opportunity taken from the examplejobs.js file

import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import style, { colors } from '../component.style.js';

const JobDetails = ({ route }) => {
    const { job } = route.params;
    const nav = useNavigation();

    const navigateBack = () => {
        const newList = route.params.jobsList.filter((item) => item.id !== job.id);
        console.log(newList);
        nav.navigate('Jobs', { jobsList: newList });
    }

    return (
        <View style={style.container}>
            <Text style={style.heading}>{job.name}</Text>
            <Text style={localStyle.jobLocation}>{job.location}</Text>
            <Text style={localStyle.jobSalary}>{job.salary}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(job.companyURL)}>
                <Text style={localStyle.jobCompany}>{job.companyName}</Text>
            </TouchableOpacity>
            <Text style={localStyle.jobDescription}>{job.description}</Text>

            <View style={localStyle.buttonRow}>
                <TouchableOpacity style={style.smallButton} onPress={() => navigateBack()}>
                    <Text style={style.buttonText}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.smallButton} onPress={() => Linking.openURL('https://www.totaljobs.com/job/product-manager/aj-bell-limited-job100529017')}>
                    <Text style={style.buttonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.smallButton} onPress={() => navigateBack()}>
                    <Text style={style.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyle = StyleSheet.create({
    jobTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    jobLocation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    jobSalary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    jobCompany: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    jobDescription: {
        fontSize: 16,
        color: colors.text,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default JobDetails;