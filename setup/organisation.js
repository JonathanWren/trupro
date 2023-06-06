//Screen that allows the user to select an organisation from a fixed list
//
import React, {useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import validator from 'validator';

const OrganisationListItem = ({ item }) => {
    const nav = useNavigation();

    const handlePress = (item) => {
        // show another screen passing in the contact object
        nav.navigate('Employment', {organisation: item.name})
    }

    return (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.contactCon} >
            <View style={styles.imgCon}>
                <View style={styles.contactImageTextCircle}>
                    <Image source={{ uri: 'https://s2.googleusercontent.com/s2/favicons?sz=32&domain=' + item.URL }} style={{ width: 32, height: 32 }} />
                </View>
            </View>
            <View style={styles.contactDat}>
            <Text style={styles.contactName}>
                {item?.name}
            </Text>
            </View>
        </View>
    </TouchableOpacity>
    );
};

const Organisation = () => {
    const [organisations, setOrganisations] = useState([]);
    const [search, setSearch] = useState('');
    const [url, setURL] = useState('');
    const nav = useNavigation();
    const defaultList = [
        {
            id: '1',
            name: 'ABC',
            URL: 'https://www.abc.com',
        },
        {
            id: '2',
            name: 'Hazy',
            URL: 'https://www.hazy.com',
        },
        {
            id: '3',
            name: 'BBC',
            URL: 'https://www.bbc.co.uk',
        },
        {
            id: '4',
            name: 'ITV',
            URL: 'https://www.itv.com',
        },
        {
            id: '5',
            name: 'Sky',
            URL: 'https://www.sky.com', 
        },
        {
            id: '6',
            name: 'Channel 4',
            URL: 'https://www.channel4.com',
        },
    ];

    useEffect(() => {
        setOrganisations(defaultList);
    }, []);

    const organisationFieldRef = useRef(null);

    useFocusEffect(
      React.useCallback(() => {
       // When the screen is focused
       const focus = () => {
        setTimeout(() => {
            organisationFieldRef?.current?.focus();
        }, 500);
       };
       focus();
       return focus; // cleanup
      }, [])
    );

    const filterOrganisations = (organisations, search) => {
        return organisations.filter((contact) => {
            const searchlowerlist = search.toLocaleLowerCase().split(' ');
            found = true
            const namelower = contact.name.toLowerCase();
            searchlowerlist.forEach((searchlower) => {
                if (!namelower.includes(searchlower)) {
                    found = false;
                }
            });
            return found
        });
    }

    const filteredOrganisations = search.length > -1 ? filterOrganisations(organisations, search).slice(0,5): [];

    const renderItem = ({item}) => (
        <OrganisationListItem item={item} />
    );

    return (
        <View style={styles.containerListView}>
            <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, width: '100%'}}>
                <Text style={styles.fieldInput}>Organisation</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor={colors.fieldPlaceHolderTextColor}
                    onChangeText={(search) => {
                        setSearch(search);
                    }}
                    ref={organisationFieldRef}
                />
                {filteredOrganisations.length == 0 && <View style={{width: '100%'}}>
                    <Text style={styles.text}>Add New organisation "{search}"</Text>
                    <Text style={styles.fieldInput}>Organisation URL</Text>
                    <View style={{flexDirection: 'row', width: '100%', alignContent: 'center'}}>
                        <View style={{justifyContent: 'space-around', paddingRight: 10,}}>
                            <View style={styles.contactImageTextCircle}>
                                <Image source={{ uri: 'https://s2.googleusercontent.com/s2/favicons?sz=32&domain=' + url }} style={{ width: 32, height: 32 }} />
                            </View>
                        </View>
                        <View style={[styles.input, {flex: 1, flexDirection: 'row'}]}>
                            <Text style={{paddingRight: 10, justifyContent: 'space-around', color: colors.fieldPlaceHolderTextColor}}>https://</Text>
                            <TextInput
                            style={{flex: 1}}
                                placeholder="URL"
                                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                                onChangeText={(url) => {
                                    setURL(url);
                                }}
                                keyboardType='url'
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                style={styles.button}
                onPress={() => {                    
                    if (url == '') {
                        alert("Please enter the url of the organisation you want to add");
                    } else if (!validator.isURL(url)) {
                        alert("Please enter a valid url");
                    } else {
                        nav.navigate('Employment', {organisation: search});
                    }}}
                >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
                </View>}
            </View>
            <FlatList
                data={filteredOrganisations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{width: '100%'}}
            />
        </View>
    );
}

export default Organisation;
