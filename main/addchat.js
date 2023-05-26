//Screen that shows the list of people who trust you and allows clicking on them to start a conversation
//
import React, {useContext, useState, } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import {defaultList, contacts} from '../setup/names';
import { ChatsContext } from '../setup/context.js';

//TODO, request an introduction for people not in contact list

const AddChat = ({route}) => {
    const [search, setSearch] = useState('');
    const nav = useNavigation();
    const {chats, setChats } = useContext(ChatsContext);

    const handlePress = (item) => {
       if(contacts.includes(item)) {
            if(!chats.includes(item)) {
                setChats([...chats, item]);
            }
            nav.replace('Chat', {contact: item})
        } else {

            nav.navigate('RequestIntroduction', {contact: item})
        }
    }

    const filterContacts = (sourceContacts, search) => {
        return sourceContacts.filter((contact) => {
            const searchLower = search.toLowerCase();
            const searchlowerlist = searchLower.split(' ');
            found = true
            const namelower = contact.name ? contact.name.toLowerCase() : "";
            searchlowerlist.forEach((searchlower) => {
                if (!namelower.includes(searchlower)) {
                    found = false;
                }
            });
            return found;
        });
    }

    const renderItem = ({ item }) => {
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
                        {item?.firstName} {item?.middleName && item.middleName + ' '}
                        {item?.lastName}
                    </Text>
                    <Text style={localStyles.emailText}>
                        {item.role ? item.role + ' at ' + item.company : ''}
                    </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const filteredContacts = [...filterContacts(contacts, search).slice(0,5), ...filterContacts(defaultList, search)];

    return (
        <View style={styles.containerListView}>
            <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, width: '100%'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Search"
                />
            </View>
            <FlatList
                style={{width: '100%'}}
                data={filteredContacts} 
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default AddChat;

const localStyles = StyleSheet.create({
    emailText: {
        color: '#888',
      },
});


