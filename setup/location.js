//Screen that allows the user to select a location from a fixed list
//
import React, {useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../component.style.js';

const Location = () => {
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState('');
    const nav = useNavigation();
    //List of locations
    const defaultList = [
        {
            id: '1',
            name: 'London',
            country: 'UK',
        },
        {
            id: '2',
            name: 'New York',
            country: 'USA',
        },
        {
            id: '3',
            name: 'Paris',
            country: 'France',
        },
        {
            id: '4',
            name: 'Berlin',
            country: 'Germany',
        },
        {
            id: '5',
            name: 'Stroud',
            country: 'UK',
        },
        {
            id: '6',
            name: 'Bristol',
            country: 'UK',
        },
        {
            id: '7',
            name: 'Capetown',
            country: 'South Africa',
        },
        {
            id: '8',
            name: 'Toronto',
            country: 'Canada',
        },
    ]

    useEffect(() => {
        setLocations(defaultList);
    }, []);

    const locationFieldRef = useRef(null);

    useFocusEffect(
      React.useCallback(() => {
       // When the screen is focused
       const focus = () => {
        setTimeout(() => {
            locationFieldRef?.current?.focus();
        }, 500);
       };
       focus();
       return focus; // cleanup
      }, [])
    );

    const filterLocations = (locations, search) => {
        return locations.filter((location) => {
            const searchlowerlist = search.toLocaleLowerCase().split(' ');
            found = true
            const namelower = location.name.toLowerCase();
            searchlowerlist.forEach((searchlower) => {
                if (!namelower.includes(searchlower)) {
                    found = false;
                }
            });
            return found
        });
    }

    const handlePress = (item) => {
        // show another screen passing in the contact object
        nav.navigate('Profile', {location: item.name});
    }

    const filteredLocations = search.length > -1 ? filterLocations(locations, search).slice(0,5): [];

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.contactCon} >
            <View style={styles.contactDat}>
            <Text style={styles.contactName}>
                {item?.name + ': ' + item?.country}
            </Text>
            </View>
        </View>
    </TouchableOpacity>
    );

    return (
        <View style={styles.containerListView}>
            <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, width: '100%'}}>
                <Text style={styles.fieldInput}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(search) => {
                        setSearch(search);
                    }}
                    ref={locationFieldRef}
                />
            </View>
            <FlatList
                data={filteredLocations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{width: '100%'}}
            />
        </View>
    );
}

export default Location;
