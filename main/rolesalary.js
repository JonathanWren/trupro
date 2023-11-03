//Screen with a slider for selecting the minimum salary required

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { saveNextMove } from '../redux/profileSlice.js';

const RoleSalary = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
    const initialSalary = useSelector(state => state.profile.nextMove.salary);
    const [salary, setSalary] = useState(initialSalary);
    
    const salaryArray = [[30,1],[20,2],[14,5],[10,10],[10,25]];
    const minimumSalary = 10;

    const salaryToSlider = salary => {
      var slider = 0;
      var salaryRemaining = salary/1000 - minimumSalary;
      for (var i = 0; salaryRemaining > 0; i++) {
        var stepSalary = salaryRemaining < salaryArray[i][0] * salaryArray[i][1] ? salaryRemaining : salaryArray[i][0] * salaryArray[i][1];
        salaryRemaining -= stepSalary;
        slider += stepSalary/salaryArray[i][1];
      }
      return slider;
    }

    const sliderToSalary = sliderValue => {
        var salary = minimumSalary;
        var sliderRemaining = sliderValue;
        for (var i = 0;sliderRemaining > 0; i++) {
          var stepSlider = sliderRemaining < salaryArray[i][0] ? sliderRemaining : salaryArray[i][0];
          sliderRemaining -= stepSlider;
          salary += stepSlider * salaryArray[i][1];
        }
        return salary * 1000;
    } 

    const initialSliderValue = salaryToSlider(initialSalary);

    return(
        <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>What is the minimum salary you would accept for your next role?</Text>
        <Text style={styles.text}>Drag the slider to set your minimum salary</Text>
        <Text style={styles.text}>£{salary}</Text>
        <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={84}
            step={1}
            value={initialSliderValue}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(sliderValue) => {
                setSalary(sliderToSalary(sliderValue));
            }}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                dispatch(saveNextMove({salary: salary}));
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