//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { updateNextLocation } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={importedstyles.container}>
            <Text style={importedstyles.heading}>Location</Text>
            
            <GooglePlacesInput/>
            <TouchableOpacity
                style={importedstyles.button}
                onPress={() => {
                    dispatch(updateNextLocation({location: }));
                    nav.navigate("Next Move");
                }}
            >
                <Text style={importedstyles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const GooglePlacesInput = () => {
    return (
      <View width={'100%'} height={'90%'}>
      <Text style={importedstyles.text}>Select your location</Text>
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyAzvm4cAz7g2U-NnaGqU3S5Vkqv0oinOhQ',
          language: 'en',
        }}
      />
      </View>
    );
  };

export default RoleLocation;