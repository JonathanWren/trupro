//  Screen showing the jobs that the user has saved and also those they have applied for

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Image, StyleSheet, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import style, { colors } from '../component.style.js';
import { useSelector, useDispatch } from 'react-redux';


const MyJobs = () => {
   const savedJobs = useSelector(state => state.jobs.savedJobs);
   const appliedJobs = useSelector(state => state.jobs.appliedJobs);

    const nav = useNavigation();

    const navigateToJobDetails = (job) => {
        nav.navigate('Job Details', { job: job});
    }

    const renderItem = ({ item }) => {
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

    return (
        <View>
            <Text style={style.heading}>Saved Jobs</Text>
            <FlatList
                data={savedJobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text style={style.heading}>Applied Jobs</Text>
            <FlatList
                data={appliedJobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const localStyle = StyleSheet.create({
    jobContainer: {
        backgroundColor: 'white',
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

export default MyJobs;
