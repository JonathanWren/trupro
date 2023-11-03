//Screen asking questions about what roles they are looking for
//
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, {colors} from '../component.style.js';
import { useSelector } from 'react-redux';

const Opportunity = () => {

    const nav = useNavigation();

    const nextTitles = useSelector(state => state.profile.nextMove.titles);
    const nextLocation = useSelector(state => state.profile.nextMove.locationName);
    const nextSalary = useSelector(state => state.profile.nextMove.salary);
    const nextJobType = useSelector(state => state.profile.nextMove.jobType);
    const nextSeniority = useSelector(state => state.profile.nextMove.seniority);
    const nextLocationDistance = useSelector(state => state.profile.nextMove.locationDistance);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.heading}>Where would you like your career to go next?</Text>
            <Text style={styles.text}>We will use this information to match you with the right opportunities within your network.</Text>
            <Text style={styles.fieldInput}>Role</Text>
            <Text
                    style={[styles.input, nextTitles.length == 0 && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Role');
                    }}
                >{nextTitles.length > 0 ? nextTitles.join(", ") : 'Role'}
            </Text>
            <Text style={styles.fieldInput}>Seniority</Text>
            <Text
                    style={[styles.input, (!nextSeniority || nextSeniority.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSeniority');
                    }}
                >{nextSeniority && nextSeniority.length > 0 ? nextSeniority.map(item => item).join(', ') : 'Seniority'}
            </Text>
            <Text style={styles.fieldInput}>Job Type</Text>
            <Text
                    style={[styles.input, (!nextJobType || nextJobType.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleJobType');
                    }}
                >{nextJobType && nextJobType.length > 0 ? nextJobType.map(item => item).join(', ') : 'Job Type'}
            </Text>
            <Text style={styles.fieldInput}>Minimum Salary</Text>
            <Text
                    style={[styles.input, !nextSalary && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSalary');
                    }}
                >{nextSalary ? '£' + nextSalary : 'Salary'}
            </Text>
            <Text style={styles.fieldInput}>Location</Text>
            <Text
                    style={[styles.input, !nextLocation && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleLocation');
                    }}
                >{nextLocation ? nextLocationDistance + " miles from " + nextLocation  : 'Location'}
            </Text>
            </ScrollView>
        </View>
    );
}

export default Opportunity;