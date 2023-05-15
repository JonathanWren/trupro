//Screen that shows a list of contacts that can be searched and allows the user to select one or add a contact manually

import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import styles from '../component.style.js';

//TODO Allow adding a contact manually

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const nav = useNavigation();
    const defaultList = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            name: 'John Doe',
            role: 'Developer',
            company: 'ABC',
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            name: 'Jane Doe',
            role: 'Developer',
            company: 'ABC',
        },
        {
            id: '3',
            firstName: 'Fred',
            lastName: 'Smith',
            name: 'Fred Smith',
            role: 'Product Manager',
            company: 'Hazy',
        },
        {
            id: '4',
            firstName: 'Jane',
            lastName: 'Smith',
            name: 'Jane Smith',
            role: 'Product Owner',
            company: 'BBC',
        },
        {
            id: '5',
            firstName: 'John',
            lastName: 'Smith',
            name: 'John Smith',
            role: 'Tester',
            company: 'ITV',
        },
        {
            id: '6',
            firstName: 'Fred',
            lastName: 'Jones',
            name: 'Fred Jones',
            role: 'QA Lead',
            company: 'Sky',
        }]

    useEffect(() => {
        showFirstContactAsync();
    }, []);

    const showFirstContactAsync = async () => {
        // Ask for permission to query contacts.
        const permission = await Contacts.requestPermissionsAsync();
        if (permission.status !== 'granted') {
        return;
        }
        const contacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        sort: Contacts.SortTypes.FirstName,
        });
    
        if (contacts.total > 0) {
            const filteredList = contacts.data.filter((contact) => {return contact.phoneNumbers});
            setContacts(filteredList);
        }
    };

    const handlePress = (item) => {
        // show another screen passing in the contact object
        nav.navigate('KeywordSelector', { contact: item });
    }

    const filterContacts = (contacts, search) => {
        return contacts.filter((contact) => {
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

    const filteredContacts = search != '' ? [...filterContacts(contacts, search).slice(0,5), ...filterContacts(defaultList, search)] : filterContacts(defaultList, search);


    return (
        <View style={styles.container}>
            <View style={{Flex: 1, flexDirection: 'row'}} >
                <TextInput style={styles.input}
                placeholder="Enter name, email address or phone number"
                onChangeText={(search) => {
                    setSearch(search);
                }}
                />
            </View>
            <FlatList
            style={{width: '100%'}}
            data={filteredContacts.slice(0, 500)}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                    <View style={styles.contactCon} >
                        <View style={styles.imgCon}>
                            <View style={styles.contactImageTextCircle}>
                                <Text style={styles.contactImgTxt}>{item?.name[0].toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={styles.contactDat}>
                        <Text style={styles.contactName}>
                            {item?.firstName} {item?.middleName && item.middleName + ' '}
                            {item?.lastName}
                        </Text>
                        <Text style={localstyles.emailText}>
                            {item.phoneNumbers ? item.phoneNumbers[0].number : item.role ? item.role + ' at ' + item.company : ''}
                        </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const localstyles = StyleSheet.create({



    emailText: {
      color: '#888',
    },
  });

export default ContactsList;