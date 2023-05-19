//Screen to allow entering name and job title and validate that are completed before continuing
//
import React, { useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../component.style.js';
import Autocomplete from "react-native-autocomplete-input";

const Profile = () => {
    const nav = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    //TODO Allow entering a phone number country code

    const searchLocation = (query) => {
        if (query.length > 1) {
          // Use api to search for locations
          let suggestedLocations = ["New York", "Boston", "Chicago"].filter((location) => {return location.includes(query);});
          setLocationList(suggestedLocations);
        } else {
            setLocationList([]);
        }
      };
    
      const onLocationChange = (text) => {
        setLocation(text);
        searchLocation(text);
      };
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.fieldInput}>Email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                    keyboardType="email-address"
                />
                <Text style={styles.fieldInput}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    onChangeText={(phoneNumber) => {
                        setPhoneNumber(phoneNumber);
                    }}
                    keyboardType="phone-pad"
                />
                <Text style={styles.fieldInput}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    onChangeText={(firstName) => {
                        setFirstName(firstName);
                    }}
                />
                <Text style={styles.fieldInput}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    onChangeText={(lastName) => {
                        setLastName(lastName);
                    }}
                />
                <Text style={styles.fieldInput}>Where do you live?</Text>
                <Autocomplete
                    data={locationList}
                    placeholder="Enter your location"
                    value={location}
                    style={[styles.input]}
                    inputContainerStyle={styles.autoCompleteContainer}
                    onChangeText={(text) => onLocationChange(text)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        onPress={() => {
                            setLocation(item);
                        }}
                        >
                        <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {            
                        //Validate that name and job title are completed
                        if (firstName === '') {
                            alert('Please complete your first name');
                            return;
                        }

                        nav.navigate('Employment');
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Profile;