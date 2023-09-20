//Screen allowing user to select their role. Currently only support product management roles.

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import { useDispatch } from 'react-redux';
//import { updateNextLocation } from '../redux/profileSlice.js';
import { updateNextLocationName,updateNextLocationlat,updateNextLocationlng,updateNextLocation } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
import secretconfig from '../main/secretconfig.js';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();

    const [location, setLocation] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Location</Text>

            <View width={'100%'} height={'100%'}>
                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    //currentLocation={true}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        /*updateNextLocation({
                            location:{
                                name: data.description,
                                lat: details.geometry.location.lat,
                                lng: details.geometry.location.lng,
                            }
                        });*/

                        /*updateNextLocationName(data.description);
                        updateNextLocationlat(details.geometry.location.lat);
                        updateNextLocationlng(details.geometry.location.lng);*/

                        updateNextLocation({
                            locationName: data.description,
                            locationLat: details.geometry.location.lat,
                            locationLng: details.geometry.location.lng,
                            })

                        //navigate (close this screen)
                        console.log(data, details);
                    }}
                    query={{
                        key: secretconfig.GooglePlacesKey,
                        language: 'en',
                        types: 'geocode',
                    }}
                    textInputProps={{
                        defaultvalue: location,
                    }}
                />
            </View>

        </View>
    );
}


export default RoleLocation;