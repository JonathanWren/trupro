//Screen allowing user to select their location.

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
import { updateNextLocation } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import config from '../main/config.js';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Location</Text>
        <View width={'100%'} height={'90%'}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            fetchDetails={true}
            requestUrl={{
              useOnPlatform: 'all', // or "all"
              url:
                config.BASE_URL + 'googleplaces', // or any proxy server that hits https://maps.googleapis.com/maps/api
              headers: {
               // Authorization: `an auth token`, // if required for your proxy
              },
            }}
            onPress={ (data, details = null) => {
                if (data.description === 'Current Location') {
                  //fetching location
                  (async () => {
                      const { status } = await Location.requestForegroundPermissionsAsync();
                      if (status !== 'granted') {
                        alert('Permission to access location was denied');
                        return;
                      }
                
                      const location = await Location.getCurrentPositionAsync({});
                      dispatch(
                        updateNextLocation({
                          locationName: 'Current Location',
                          locationLat: location.coords.latitude,
                          locationLng: location.coords.longitude,
                        })
                      )
                    }
                  )();
                }              
                else {
                  //set the location of item
                  dispatch(
                    updateNextLocation({
                      locationName: data.description,
                      locationLat: details.geometry.location.lat,
                      locationLng: details.geometry.location.lng,
                    })
                  )
                }
                nav.navigate("Next Move");
              }
            }
            query={{
              language: 'en',
              types: 'geocode',
            }}
            predefinedPlaces={[{description: 'Current Location', geometry: {location: {lat: 0, lng: 0}}}]}
          />
        </View>
        </ScrollView>
      </View>
    );
  }

export default RoleLocation;