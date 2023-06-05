//Screen showing a list of chats with floating button to add a new chat
//
import React, {useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import styles, { colors } from '../component.style.js';
import { useSelector } from 'react-redux';

const ChatsListItem = ({ item }) => {
    const nav = useNavigation();

    const handlePress = (item) => {
        // show another screen passing in the contact object
        nav.navigate('Chat', {contact: item})
    }

    return (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.contactCon} >
            <View style={styles.imgCon}>
                <View style={styles.contactImageTextCircle}>
                    <Text>{item.name[0]}</Text>
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
}

const Chats = () => {
    const chats = useSelector(state => state.chats.chats);
    const [search, setSearch] = useState('');
    const [filteredChats, setFilteredChats] = useState([]);
    const nav = useNavigation();

    useEffect(() => {
        if(chats) {
            setFilteredChats(chats.filter((chat) => {
                return chat.name.toLowerCase().includes(search.toLowerCase())}));
        }
    }, [search, chats]);

    const handlePress = (item) => {
        nav.navigate('ChatScreen', { item: item });
    }

    const handleAdd = () => {
        nav.navigate('AddChat');
    }

    return (
        <View style={localStyles.container}>
            <View style={localStyles.searchBar}>
                <TextInput
                    style={localStyles.searchInput}
                    placeholder="Search"
                    onChangeText={(search) => {
                        setSearch(search);
                    }}
                    value={search}
                />
            </View>
            <FlatList

                data={filteredChats}
                renderItem={({ item }) => <ChatsListItem item={item} onPress={() => handlePress(item)} />}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 100,
                }}
                onPress={handleAdd}
            >
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Chats;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    searchInput: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
    },
});


