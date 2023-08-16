//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { updateNextLocation } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();

    const [location, setLocation] = useState('');

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Location</Text>

        <View width={'100%'} height={'90%'}>
          <Text style={styles.text}>Select your location</Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setLocation(data.description);
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyAzvm4cAz7g2U-NnaGqU3S5Vkqv0oinOhQ',
              language: 'en',
            }}
          />
        </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(updateNextLocation({location}));
                    nav.navigate("Next Move");
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}


export default RoleLocation;