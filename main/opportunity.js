//Screen asking questions about what roles they are looking for
//
import React from 'react';
import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, {colors} from '../component.style.js';

const Opportunity = ({route}) => {

    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Where would you like your career to go next?</Text>
            <Text style={styles.fieldInput}>Role</Text>
            <Text
                    style={[styles.input, (!route.params || !route.params.opportunity || !route.params.opportunity.role) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('Role', {opportunity: route.params ? route.params.opportunity : {}});
                    }}
                >{route.params && route.params.opportunity && route.params.opportunity.role ? route.params.opportunity.role : 'Role'}
            </Text>
            <Text style={styles.fieldInput}>Location</Text>
            <Text
                    style={[styles.input, (!route.params || !route.params.opportunity || !route.params.opportunity.location) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleLocation', {opportunity: route.params ? route.params.opportunity : {}});
                    }}
                >{route.params && route.params.opportunity && route.params.opportunity.location ? route.params.opportunity.location : 'Location'}
            </Text>
            <Text style={styles.fieldInput}>Salary</Text>
            <Text
                    style={[styles.input, (!route.params || !route.params.opportunity || !route.params.opportunity.salary) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSalary', {opportunity: route.params ? route.params.opportunity : {}});
                    }}
                >{route.params && route.params.opportunity && route.params.opportunity.salary ? '£' + route.params.opportunity.salary + 'K' : 'Salary'}
            </Text>
            <Text style={styles.fieldInput}>Job Type</Text>
            <Text
                    style={[styles.input, (!route.params || !route.params.opportunity || !route.params.opportunity.jobType || route.params.opportunity.jobType.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleJobType', {opportunity: route.params ? route.params.opportunity : {}});
                    }}
                >{route.params && route.params.opportunity && route.params.opportunity.jobType && route.params.opportunity.jobType.length > 0 ? route.params.opportunity.jobType.map(item => item).join(', ') : 'Job Type'}
            </Text>
            <Text style={styles.fieldInput}>Seniority</Text>
            <Text
                    style={[styles.input, (!route.params || !route.params.opportunity || !route.params.opportunity.seniority || route.params.opportunity.seniority.length == 0) && {color: colors.fieldPlaceHolderTextColor}]}
                    onPress={() => {
                        nav.navigate('RoleSeniority', {opportunity: route.params ? route.params.opportunity : {}});
                    }}
                >{route.params && route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.length > 0 ? route.params.opportunity.seniority.map(item => item).join(', ') : 'Seniority'}
            </Text>
        </View>
    );
}

export default Opportunity;