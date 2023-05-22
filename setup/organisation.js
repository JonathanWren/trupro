//Screen that allows the user to select an organisation from a fixed list
//
import React, {useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';

//TODO get favicon from URL as follows: https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript

const OrganisationListItem = ({ item }) => {
    // const [favicon, setFavicon] = useState(null);

    // useEffect(() => {
    //     const fetchFavicon = async () => {
    //       try {
    //         const response = await fetch(item.URL);
    //         setFavicon(response);
    //         console.log(item.URL);
    //         console.log(response);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     }
    //     fetchFavicon();
    //   }, []);
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
                    <Text style={styles.contactImgTxt}>{item?.name[0].toUpperCase()}</Text>
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
            URL: 'https://www.hazy.com/images/favicons/favicon.svg',
        },
        {
            id: '3',
            name: 'BBC',
            URL: 'https://www.bbc.co.uk/favicon.ico',
        },
        {
            id: '4',
            name: 'ITV',
            URL: 'https://app.10ft.itv.com/itvstatic/assets/images/brands/itvx/favicon-32x32.png',
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
                    <TextInput
                        style={styles.input}
                        placeholder="URL"
                        placeholderTextColor={colors.fieldPlaceHolderTextColor}
                        onChangeText={(url) => {
                            setURL(url);
                        }}
                        keyboardType='url'
                    />
                    <TouchableOpacity
                style={styles.button}
                onPress={() => {                    
                    if (url == '') {
                        alert("Please enter the url of the organisation you want to add");
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
