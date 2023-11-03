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
    const [distance, setDistance] = useState(initialDistance);

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
      <View style={[styles.container, {padding: 25}]}>
        <Text style={styles.heading}>Location</Text>
        <View style={{width: '100%'}}>
          <GooglePlacesAutocomplete
            styles={{textInput: styles.input}}
            placeholder='Enter Location'
            fetchDetails={true}
            requestUrl={{
              useOnPlatform: 'all',
              url:
                config.BASE_URL + 'googleplaces',
            }}
            onPress={ (data, details = null) => {
                if (data.description === 'Current Location') {
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
                        })
                      )
                    })
                  })
                } else {
                  //set the location of item
                  dispatch(
                    saveNextMove({
                      locationName: data.description,
                      locationLat: details.geometry.location.lat,
                      locationLng: details.geometry.location.lng,
                    })
                  )
                }
              }
            }
            query={{
              language: 'en',
              types: 'geocode',
            }}
            predefinedPlaces={[{description: 'Current Location', 
                                geometry: {location: {lat: 0, lng: 0}}},
                              {description: 'Remote',
                                geometry: {location: {lat: 0, lng: 0}}}]}
          />
        </View>
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
    );
  }

export default RoleLocation;