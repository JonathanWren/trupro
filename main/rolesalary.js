//Screen with a slider for selecting the minimum salary required

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { updateNextSalary } from '../redux/profileSlice.js';


const RoleSalary = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
    const initialSalary = useSelector(state => state.profile.nextMove.salary);
    const [salary, setSalary] = useState(initialSalary);
    
    const salaryArray = [[30,1],[20,2],[14,5],[10,10],[10,25]];

    const sliderCalculator = salary => {
      let slider = 1
      let salaryRemaining = salary;
      for (let section = 0;salaryRemaining > 0; section++) {
        if (salaryRemaining>salaryArray[section][0]*salaryArray[section][1]) {
          slider += salaryArray[section][0];
          salaryRemaining -= salaryArray[section][0]*salaryArray[section][1];
        }
        else {
          slider += salaryRemaining/salaryArray[section][1];
          salaryRemaining=0;
        }
      }
      return slider;
    }

    const initialSliderValue = sliderCalculator(initialSalary);

    const salaryCalculator = sliderValue => {
        
        let salary = 10
        let sliderRemaining = sliderValue;
        for (let section = 0;sliderRemaining > 0; section++) {
          if (sliderRemaining>salaryArray[section][0]) {
            salary += salaryArray[section][0]*salaryArray[section][1];
            sliderRemaining -= salaryArray[section][0];
          }
          else {
            salary += sliderRemaining*salaryArray[section][1];
            sliderRemaining=0;
          }
        }
        return salary;
    } 
    return(
        <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>What is the minimum salary you would accept for your next role?</Text>
        <Text style={styles.text}>Drag the slider to set your minimum salary</Text>
        <Text style={styles.text}>£{salary}K</Text>
        <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={84}
            step={1}
            value={initialSliderValue}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(sliderValue) => {
                setSalary(salaryCalculator(sliderValue));
            }}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                dispatch(updateNextSalary({salary: salary}));
                nav.navigate("Next Move");
            }}
        >
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
    )
    };

  export default RoleSalary;