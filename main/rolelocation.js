//Screen allowing user to select their location.

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, {colors} from '../component.style.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveNextMove } from '../redux/profileSlice.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import config from '../main/config.js';

const RoleLocation = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
    const initialDistance = useSelector(state => state.profile.nextMove.locationDistance);
    const [remote, setRemote] = useState(false);
    const [distance, setDistance] = useState(initialDistance);
    const CURRENT_LOCATION = 'Current Location';
    const REMOTE = 'Remote';

    const distanceArray = [[9,1],[8,2],[4,5],[10,10],[6,25],[4,50],[5,100]];
    const minimumDistance = 5;

    const distanceToSlider = distance => {
      var slider = 0;
      var distanceRemaining = distance - minimumDistance;
      for (var i = 0; distanceRemaining > 0; i++) {
        var stepDistance = distanceRemaining < distanceArray[i][0] * distanceArray[i][1] ? distanceRemaining : distanceArray[i][0] * distanceArray[i][1];
        distanceRemaining -= stepDistance;
        slider += stepDistance/distanceArray[i][1];
      }
      return slider;
    }

    const sliderToDistance = sliderValue => {
        var distance = minimumDistance;
        var sliderRemaining = sliderValue;
        for (var i = 0;sliderRemaining > 0; i++) {
          var stepSlider = sliderRemaining < distanceArray[i][0] ? sliderRemaining : distanceArray[i][0];
          sliderRemaining -= stepSlider;
          distance += stepSlider * distanceArray[i][1];
        }
        return distance;
    } 

    const initialSliderValue = distanceToSlider(initialDistance);
  
    return (
      <View style={[styles.container, {padding: 25, width:"100%", alignItems: 'center'}]}>
        <View style={styles.centerView}>
        <View style={{width:"100%", zIndex: 1, height: 50}}>
        <GooglePlacesAutocomplete
          styles={{textInput: styles.input, listView: {position: 'absolute', top: 50, width: '100%'}}}
          placeholder='Enter Location'
          fetchDetails={true}
          requestUrl={{
            useOnPlatform: 'all',
            url:
              config.BASE_URL + 'googleplaces',
          }}
          onPress={ (data, details = null) => {
              if (data.description === CURRENT_LOCATION) {
                Location.requestForegroundPermissionsAsync()
                .then((status) => {
                  console.log(status);

                  if (!status.granted) {
                    alert('Permission to access location was denied');
                    return;
                  }
              
                  Location.getCurrentPositionAsync({})
                  .then((location) => {
                    console.log(location.coords.latitude, location.coords.longitude)
                    dispatch(
                      saveNextMove({
                        locationName: 'Current Location',
                        locationLat: location.coords.latitude,
                        locationLng: location.coords.longitude,
                        locationRemote: false,
                      })
                    );
                    setRemote(false);
                  });
                })
              } else if (data.description === REMOTE) {
                dispatch(
                  saveNextMove({
                    locationName: 'Remote',
                    locationLat: 0,
                    locationLng: 0,
                    locationRemote: true,
                  })
                );
                setRemote(true);
              } else {
                //set the location of item
                dispatch(
                  saveNextMove({
                    locationName: data.description,
                    locationLat: details.geometry.location.lat,
                    locationLng: details.geometry.location.lng,
                    locationRemote: false,
                  })
                );
                setRemote(false);
              }
            }
          }
          query={{
            language: 'en',
            types: 'geocode',
          }}
          predefinedPlaces={[{description: CURRENT_LOCATION, 
                              geometry: {location: {lat: 0, lng: 0}}},
                            {description: REMOTE,
                              geometry: {location: {lat: 0, lng: 0}}}]}
        />
        </View>
        <View style={{width: "100%"}}>
        {!remote && 
        <View style={{width: "100%"}}>
        <Text style={styles.text}>Drag the slider to set how far you are willing to travel.</Text>
        <Text style={styles.text}>{distance} miles</Text>
        <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={46}
            step={1}
            value={initialSliderValue}
            minimumTrackTintColor={colors.fieldBackgroundColor}
            maximumTrackTintColor={colors.fieldBackgroundColor}
            onValueChange={(sliderValue) => {
              setDistance(sliderToDistance(sliderValue));
            }}
        />
        </View>
                  }
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                dispatch(saveNextMove({locationDistance: distance}));
                nav.navigate("Next Move");
            }}
        >
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  }

export default RoleLocation;