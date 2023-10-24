//Screen allowing users to enter the job type. The job types should be a list of checkboxes which are saved in an array. The options are full time, part time, contract, temporary.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import CheckBox from "expo-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { updateNextJobType } from '../redux/profileSlice.js';

const JobTypeCheckBox = ({ type, checked: isChecked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={(checked) => onChange(checked)}
            color={isChecked ? 'blue' : undefined}/>
            <Text style={styles.checkboxText} onPress={() => onChange(!isChecked)}>{type}</Text>
        </View>
    );
}

const RoleJobType = () => {
    
        const nav = useNavigation();
        const dispatch = useDispatch();

        const initialJobType = useSelector(state => state.profile.nextMove.jobType);
    
        const [jobTypeFullTime, setJobTypeFullTime] = useState(initialJobType.some(data => data === 'Full Time'));
        const [jobTypePartTime, setJobTypePartTime] = useState(initialJobType.some(data => data === 'Part Time'));
        const [jobTypeContract, setJobTypeContract] = useState(initialJobType.some(data => data === 'Contract'));
        const [jobTypeTemporary, setJobTypeTemporary] = useState(initialJobType.some(data => data === 'Temporary'));
    
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                <Text style={styles.heading}>Job Type</Text>
                <Text style={styles.text}>What type of job are you looking for?</Text>
                <JobTypeCheckBox type="Full Time"  checked={jobTypeFullTime} onChange={setJobTypeFullTime}/>
                <JobTypeCheckBox type="Part Time" checked={jobTypePartTime} onChange={setJobTypePartTime}/>
                <JobTypeCheckBox type="Contract" checked={jobTypeContract} onChange={setJobTypeContract}/>
                <JobTypeCheckBox type="Temporary" checked={jobTypeTemporary} onChange={setJobTypeTemporary}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        var newJobType = [];
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
                        dispatch(updateNextJobType({jobType: newJobType}));
                        nav.navigate("Next Move");
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

export default RoleJobType;