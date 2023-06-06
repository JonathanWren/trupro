//  Screen showing the jobs that the user has saved and also those they have applied for

import React from 'react';
import { View, Text, FlatList, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import style, { colors } from '../component.style.js';
import { useSelector } from 'react-redux';
import JobsListItem from './joblistitem.js';


const MyJobs = () => {
   const savedJobs = useSelector(state => state.jobs.savedJobs);
   const appliedJobs = useSelector(state => state.jobs.appliedJobs);

    const nav = useNavigation();

    const navigateToJobDetails = (job) => {
        nav.navigate('Job Details', { job: job});
    }

    const renderItem = ({ item }) => {
        return (
            <JobsListItem item={item} />
        );
    }

    return (
        <View style={{backgroundColor: colors.appBackgroundColor}}>
            <Text style={style.heading}>Saved Jobs</Text>
            {savedJobs.length == 0 && <Text style={style.text}>You have no saved jobs</Text>}
            <FlatList
                data={savedJobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text style={style.heading}>Applied Jobs</Text>
            {appliedJobs.length == 0 && <Text style={style.text}>You have no applied jobs</Text>}
            <FlatList
                data={appliedJobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

export default MyJobs;
