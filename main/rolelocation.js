//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { updateNextLocation } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
import secretconfig from '../main/secretconfig.js';
import * as Location from 'expo-location';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
  
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let text = '';
  
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      //text = JSON.stringify(location);
      text = location.coords.latitude + ', ' + location.coords.longitude;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Location</Text>
        <Text style={styles.text}>{text}</Text>
  
        <View width={'100%'} height={'90%'}>
          <GooglePlacesAutocomplete
          placeholder='Enter Location'
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (data.description === 'Current Location') {
                //fetching location
                (async () => {
                  text = 'Loading...';
                  let { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                  }
            
                  let location = await Location.getCurrentPositionAsync({});
                    dispatch(updateNextLocation({
                        locationName: 'Current Location',
                        locationLat: location.coords.latitude,
                        locationLng: location.coords.longitude,
                    }))
                    setLocation(location);
                })();}              
              else {
                //set the location of item
                dispatch(updateNextLocation({
                    locationName: data.description,
                    locationLat: details.geometry.location.lat,
                    locationLng: details.geometry.location.lng,
                }))
                setLocation({coords: {latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}, description: data.description})
              }
              nav.navigate("Next Move");
            }}
            query={{
              key: secretconfig.GooglePlacesKey,
              language: 'en',
              types: 'geocode',
            }}
            textInputProps={{
              defaultvalue: location,
            }}
            predefinedPlaces={[{description: 'Current Location', geometry: {location: {lat: 0, lng: 0}}}]}
          />
        </View>
      </View>
    );
  }

export default RoleLocation;