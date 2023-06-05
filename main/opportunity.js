//Screen asking questions about what roles they are looking for
//
import React from 'react';
import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, {colors} from '../component.style.js';
import { useSelector } from 'react-redux';

const Opportunity = () => {

    const nav = useNavigation();

    const nextTitle = useSelector(state => state.profile.nextMove.title);
    const nextLocation = useSelector(state => state.profile.nextMove.location);
    const nextSalary = useSelector(state => state.profile.nextMove.salary);
    const nextJobType = useSelector(state => state.profile.nextMove.jobType);
    const nextSeniority = useSelector(state => state.profile.nextMove.seniority);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Where would you like your career to go next?</Text>
            <Text style={styles.fieldInput}>Role</Text>
            <Text
                    style={[styles.input, !nextTitle && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Role');
                    }}
                >{nextTitle ? nextTitle : 'Role'}
            </Text>
            <Text style={styles.fieldInput}>Location</Text>
            <Text
                    style={[styles.input, !nextLocation && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleLocation');
                    }}
                >{nextLocation ? nextLocation : 'Location'}
            </Text>
            <Text style={styles.fieldInput}>Salary</Text>
            <Text
                    style={[styles.input, !nextSalary && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSalary');
                    }}
                >{nextSalary ? '£' + nextSalary + 'K' : 'Salary'}
            </Text>
            <Text style={styles.fieldInput}>Job Type</Text>
            <Text
                    style={[styles.input, (!nextJobType || nextJobType.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleJobType');
                    }}
                >{nextJobType && nextJobType.length > 0 ? nextJobType.map(item => item).join(', ') : 'Job Type'}
            </Text>
            <Text style={styles.fieldInput}>Seniority</Text>
            <Text
                    style={[styles.input, (!nextSeniority || nextSeniority.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSeniority');
                    }}
                >{nextSeniority && nextSeniority.length > 0 ? nextSeniority.map(item => item).join(', ') : 'Seniority'}
            </Text>
        </View>
    );
}

export default Opportunity;