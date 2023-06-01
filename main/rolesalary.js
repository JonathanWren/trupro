//Screen with a slider for selecting the minimum salary required

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import Slider from '@react-native-community/slider';


const RoleSalary = ({route}) => {
    
        const nav = useNavigation();
    
        const [salary, setSalary] = useState(0);      
    
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is the minimum salary you would accept for your next role?</Text>
                <Text style={styles.text}>Drag the slider to set your minimum salary</Text>
                <Text style={styles.text}>£{salary}K</Text>
                <Slider
                    style={{width: '100%', height: 40}}
                    minimumValue={10}
                    maximumValue={500}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(salary) => {
                        setSalary(salary);
                    }}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        nav.navigate("Next Move", {opportunity: {...route.params.opportunity, salary: salary}});
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }

export default RoleSalary;