//Screen that shows a list of contacts that can be searched and allows the user to select one or add a contact manually

import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import styles, { colors } from '../component.style.js';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import validator from 'validator';
import {defaultList} from './names';

const ContactsList = ({route}) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [added, setAdded] = useState([]);
    const [showIntro, setShowIntro] = useState(true);
    const nav = useNavigation();

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
        if(added.length == 0) {
            alert("This will cause a text/email to be sent to " + item.name + " telling them that they are in the top 25 people you have worked with and inviting them to join TruPro");
        }
        setAdded([...added, item.name]);
    }

    const filterContacts = (sourceContacts, search) => {
        return sourceContacts.filter((contact) => {
            const searchLower = search.toLowerCase();
            const searchlowerlist = searchLower.split(' ');
            var found = true
            const namelower = contact.name ? contact.name.toLowerCase() : "";
            searchlowerlist.forEach((searchlower) => {
                if (!namelower.includes(searchlower)) {
                    found = false;
                }
            });
            if(!found) {
                if(contact.phoneNumbers) {
                    if(contact.phoneNumbers[0].number.includes(searchLower)) {
                        found = true;
                    }
                }
                if(contact.emails) {
                    if(contact.emails[0].email.toLowerCase().includes(searchLower)) {
                        found = true;
                    }
                }
            }
            return found
        });
    }

    const filteredContacts = search != '' ? [...filterContacts(contacts, search).slice(0,5), ...filterContacts(defaultList, search)] : filterContacts(defaultList, search);

    return (
        <View style={styles.containerListView}>
            <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, width: '100%'}}>
                {showIntro && 
                    <Text style={styles.text}>Now you can add up to 25 of your colleagues to your list of recommended colleagues. They should be people who are 
                    good at their job and whose professional opinion you trust.</Text>
                }   
                <TextInput style={styles.input}
                placeholder="Enter name, email address or phone number"
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                keyboardType='email-address'
                multiline={true}
                onChangeText={(search) => {
                    setSearch(search);
                    setShowIntro(false);
                }}
                ref={input => { this.searchInput = input }}
                />
            </View>
                {filteredContacts.length == 0 && <View style={{width: '100%', paddingLeft: 25, paddingRight: 25,}}>
                    <Text style={styles.text}>Recommend {search}</Text>
                    <TouchableOpacity
                style={[styles.button, {width: '100%'}]}
                onPress={() => {       
                    if(validator.isEmail(search) || validator.isMobilePhone(search)) {
                        alert("added " + search );
                        this.searchInput.clear();
                        setSearch('');
                    } else {
                        alert("Please enter a complete phone number or email address");
                    }}}
            >
                <Text style={styles.buttonText}>Recommend</Text>
            </TouchableOpacity>
                </View>}
            
            <FlatList
            style={{width: '100%'}}
            data={filteredContacts.slice(0, 500)}
            renderItem={({ item }) => (
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
                    <View style={styles.contactAdd}>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                        <Text style={styles.smallButton}>{added.some(contact => contact === item.name)? 'Added': 'Add'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.id}
            />
            {route.params.inWizard &&
                <HideWithKeyboard style={{paddingLeft: 25, paddingRight: 25, paddingBottom: 10, width: '100%'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {setSetup(true);}}>
                        <Text style={styles.buttonText}>Finished</Text>
                    </TouchableOpacity>
                </HideWithKeyboard>
            }
        </View>
    );
}

const localstyles = StyleSheet.create({



    emailText: {
      color: '#888',
    },
  });

export default ContactsList;