//Screen allowing users to enter the job type. The job types should be a list of checkboxes which are saved in an array. The options are full time, part time, contract, temporary.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import CheckBox from "expo-checkbox";

const JobTypeCheckBox = ({ type, checked: isChecked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={(checked) => onChange(checked)}
            color={isChecked ? 'blue' : undefined}/>
            <Text style={styles.checkboxText} onPress={() => onChange(!isChecked)}>{type}</Text>
        </View>
    );
}

const RoleJobType = ({route}) => {
    
        const nav = useNavigation();
    
        const [jobTypeFullTime, setJobTypeFullTime] = useState(route.params.opportunity && route.params.opportunity.jobType && route.params.opportunity.jobType.some(data => data === 'Full Time'));
        const [jobTypePartTime, setJobTypePartTime] = useState(route.params.opportunity && route.params.opportunity.jobType && route.params.opportunity.jobType.some(data => data === 'Part Time'));
        const [jobTypeContract, setJobTypeContract] = useState(route.params.opportunity && route.params.opportunity.jobType && route.params.opportunity.jobType.some(data => data === 'Contract'));
        const [jobTypeTemporary, setJobTypeTemporary] = useState(route.params.opportunity && route.params.opportunity.jobType && route.params.opportunity.jobType.some(data => data === 'Temporary'));
    
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Job Type</Text>
                <Text style={styles.text}>What type of job are you looking for?</Text>
                <JobTypeCheckBox type="Full Time" checked={jobTypeFullTime} onChange={setJobTypeFullTime}/>
                <JobTypeCheckBox type="Part Time" checked={jobTypePartTime} onChange={setJobTypePartTime}/>
                <JobTypeCheckBox type="Contract" checked={jobTypeContract} onChange={setJobTypeContract}/>
                <JobTypeCheckBox type="Temporary" checked={jobTypeTemporary} onChange={setJobTypeTemporary}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        newJobType = [];
                        if (jobTypeFullTime) {
                            newJobType.push('Full Time');
                        }
                        if (jobTypePartTime) {
                            newJobType.push('Part Time');
                        }
                        if (jobTypeContract) {
                            newJobType.push('Contract');
                        }
                        if (jobTypeTemporary) {
                            newJobType.push('Temporary');
                        }
                        nav.navigate("Next Move", {opportunity: {...route.params.opportunity, jobType: newJobType}});
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }

export default RoleJobType;