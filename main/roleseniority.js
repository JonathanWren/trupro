//Screen allowing users to enter the seniority. The seniority should be a list of checkboxes which are saved in an array. The options are internship, entrylevel,  junior, midlevel, senior, expert.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import CheckBox from "expo-checkbox";

const SeniorityCheckBox = ({ type, checked: isChecked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={(checked) => onChange(checked)}
            color={isChecked ? 'blue' : undefined}/>
            <Text style={styles.checkboxText} onPress={() => onChange(!isChecked)}>{type}</Text>
        </View>
    );
}

const RoleSeniority = ({route}) => {
    
        const nav = useNavigation();
    
        const [seniorityInternship, setSeniorityInternship] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Internship'));
        const [seniorityEntryLevel, setSeniorityEntryLevel] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Entry Level'));
        const [seniorityJunior, setSeniorityJunior] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Junior'));
        const [seniorityMidLevel, setSeniorityMidLevel] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Mid Level'));
        const [senioritySenior, setSenioritySenior] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Senior'));
        const [seniorityExpert, setSeniorityExpert] = useState(route.params.opportunity && route.params.opportunity.seniority && route.params.opportunity.seniority.some(data => data === 'Expert'));
    
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
                        newSeniority = [];
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
    
                        nav.navigate("Next Move", {opportunity: {...route.params.opportunity, seniority: newSeniority}});
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }

export default RoleSeniority;