//Screen allowing users to enter the seniority. The seniority should be a list of checkboxes which are saved in an array. The options are internship, entrylevel,  junior, midlevel, senior, expert.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import CheckBox from "expo-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { updateNextSeniority } from '../redux/profileSlice.js';

const SeniorityCheckBox = ({ type, checked: isChecked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={(checked) => onChange(checked)}
            color={isChecked ? 'blue' : undefined}/>
            <Text style={styles.checkboxText} onPress={() => onChange(!isChecked)}>{type}</Text>
        </View>
    );
}

const RoleSeniority = () => {
    
        const nav = useNavigation();
        const dispatch = useDispatch();

        const initialSeniority = useSelector(state => state.profile.nextMove.seniority);
    
        const [seniorityInternship, setSeniorityInternship] = useState(initialSeniority.some(data => data === 'Internship'));
        const [seniorityEntryLevel, setSeniorityEntryLevel] = useState(initialSeniority.some(data => data === 'Entry Level'));
        const [seniorityJunior, setSeniorityJunior] = useState(initialSeniority.some(data => data === 'Junior'));
        const [seniorityMidLevel, setSeniorityMidLevel] = useState(initialSeniority.some(data => data === 'Mid Level'));
        const [senioritySenior, setSenioritySenior] = useState(initialSeniority.some(data => data === 'Senior'));
        const [seniorityExpert, setSeniorityExpert] = useState(initialSeniority.some(data => data === 'Expert'));
    
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Seniority</Text>
                <Text style={styles.text}>What level of job are you looking for?</Text>
                <SeniorityCheckBox type="Internship" checked={seniorityInternship} onChange={setSeniorityInternship}/>
                <SeniorityCheckBox type="Entry Level" checked={seniorityEntryLevel} onChange={setSeniorityEntryLevel}/>
                <SeniorityCheckBox type="Junior" checked={seniorityJunior} onChange={setSeniorityJunior}/>
                <SeniorityCheckBox type="Mid Level" checked={seniorityMidLevel} onChange={setSeniorityMidLevel}/>
                <SeniorityCheckBox type="Senior" checked={senioritySenior} onChange={setSenioritySenior}/>
                <SeniorityCheckBox type="Expert" checked={seniorityExpert} onChange={setSeniorityExpert}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        var newSeniority = [];
                        if (seniorityInternship) {
                            newSeniority.push('Internship');
                        }
                        if (seniorityEntryLevel) {
                            newSeniority.push('Entry Level');
                        }
                        if (seniorityJunior) {
                            newSeniority.push('Junior');
                        }
                        if (seniorityMidLevel) {
                            newSeniority.push('Mid Level');
                        }
                        if (senioritySenior) {
                            newSeniority.push('Senior');
                        }
                        if (seniorityExpert) {
                            newSeniority.push('Expert');
                        }

                        dispatch(updateNextSeniority({seniority: newSeniority}));
    
                        nav.navigate("Next Move");
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }

export default RoleSeniority;