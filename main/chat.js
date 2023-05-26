//Chat screen for messaging with a contact with some example messages
//
import styles, { colors } from '../component.style.js';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Chats from './chats.js';


const Chat = ({ route, navigation }) => {
    const { contact } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const exampleMessages = [
        { id: 1, message: "I think that is a great idea."},
        { id: 2, message: "Hello there!"},
        { id: 3, message: "What do you think about that?"},
        { id: 4, message: "Yes, I totally agree."},
        { id: 5, message: "I don't know, what do you think?"},
        { id: 6, message: "Sounds like a plan!"},
        { id: 7, message: "Hmm, let me think about it a bit."},
        { id: 8, message: "Sounds like we are in agreement."},
        { id: 9, message: "I'm not sure, let me get back to you."},
        { id: 10, message: "That sounds like a good idea."},
        { id: 11, message: "No, I don't think that's a good idea."},
        { id: 12, message: "Sure, why not?"},
        { id: 13, message: "Let me look into it and get back to you."},
        { id: 14, message: "I'm not sure, can you explain it more?"},
        { id: 15, message: "It depends what the end result is."},
        { id: 16, message: "I think that's a great idea!"},
        { id: 17, message: "I'm not convinced, can you elaborate?"},
        { id: 18, message: "OK, let's give it a try."},
        { id: 19, message: "Yes, let's do it!"},
        { id: 20, message: "No, that won't work."},
        { id: 21, message: "Maybe we can come up with a better solution."},
        { id: 22, message: "That's a bit premature, let's think it through first."},
        { id: 23, message: "Let me check with a few people first and get back to you."},
        { id: 24, message: "I think that would be a good idea."},
        { id: 25, message: "I'm not sure, can you give me more info?"},
        { id: 26, message: "Why don't we give it a try and see what happens?"},
        { id: 27, message: "Let's discuss this further and see where it goes."},
        { id: 28, message: "I'd have to look into that a bit more."},
        { id: 29, message: "I don't think that's a good idea at all."},
        { id: 30, message: "Let's brainstorm some other ideas first."},
        { id: 31, message: "I'm not sure, what do you think?"},
        { id: 32, message: "I think we need to look at it from another angle."},
        { id: 33, message: "That could work, let me do some research and get back to you."},
        { id: 34, message: "OK, let's give it a try."},
        { id: 35, message: "I'm not sure yet, I need to do more research."},
        { id: 36, message: "Let me think about it and get back to you."},
        { id: 37, message: "I'm not sure about that, let me look into it some more."},
        { id: 38, message: "I think that would be a great option."},
        { id: 39, message: "I'm not so sure, can you explain it more?"},
        { id: 40, message: "Yeah, let's give it a shot and see what happens."},
        { id: 41, message: "I don't know, can you explain it some more?"},
        { id: 42, message: "That sounds like a good idea, let's give it a try."},
        { id: 43, message: "I'm not convinced, let me think about it a bit more."},
        { id: 44, message: "Sounds good, let's go for it!"},
        { id: 45, message: "No, I'm not sure about that."},
        { id: 46, message: "Let me check with a few people first and get back to you."},
        { id: 47, message: "I think we should explore other options first."},
        { id: 48, message: "I'm not sure, what do you think?"},
        { id: 49, message: "Yes, let's do it!"},
        { id: 50, message: "I'm not convinced, can you explain it more?"},
        { id: 51, message: "Maybe, let me check something first and get back to you."},
        { id: 52, message: "That's a good idea, let's try it out."},
        { id: 53, message: "I'm not sure, can you explain it a bit more?"},
        { id: 54, message: "I think that could work, let's give it a try."},
        { id: 55, message: "Hmm, let me think about it a bit."},
        { id: 56, message: "I'm not sure yet, can you explain it some more?"},
        { id: 57, message: "Yes, I totally agree."},
        { id: 58, message: "No, that won't work."},
        { id: 59, message: "I'm not convinced, let me think about it a bit more."},
        { id: 60, message: "Yes, that sounds like a good option."},
        { id: 61, message: "OK, let's give it a try."},
        { id: 62, message: "No, I don't think that's a good idea."},
        { id: 63, message: "I'm not sure yet, let me look into it a bit more."},
        { id: 64, message: "That sounds like a plan!"},
        { id: 65, message: "I think that might be a good option."},
        { id: 66, message: "Let me do some research and get back to you."},
        { id: 67, message: "I'm not sure, what do you think?"},
        { id: 68, message: "Maybe, let me look into it a bit more."},
        { id: 69, message: "Yes, let's give it a try!"},
        { id: 70, message: "I don't know, can you explain it more?"},
        { id: 71, message: "I'm not convinced yet, can you elaborate?"},
        { id: 72, message: "Let's discuss this further and see where it goes."},
        { id: 73, message: "I'm not sure yet, I need to do more research."},
        { id: 74, message: "Yes, that sounds like a great idea!"},
        { id: 75, message: "No, I don't think that would work."},
        { id: 76, message: "Let me think about it and get back to you."},
        { id: 77, message: "I think we should explore other options first."},
        { id: 78, message: "Maybe we can come up with a better solution."},
        { id: 79, message: "I'm not sure, can you give me more info?"},
        { id: 80, message: "I'm not convinced, let me look into it some more."},
        { id: 81, message: "It depends what the end result is."},
        { id: 82, message: "I think that is a great idea."},
        { id: 83, message: "No, I don't think that would work."},
        { id: 84, message: "Let's brainstorm some other ideas first."},
        { id: 85, message: "I'm not sure, what do you think?"},
        { id: 86, message: "Yes, let's give it a try!"},
        { id: 87, message: "No, I'm not convinced."},
        { id: 88, message: "I think that would be a great option."},
        { id: 89, message: "I'm not sure, can you explain more?"},
        { id: 90, message: "I'm not comfortable with that."},
        { id: 91, message: "I agree with you."},
        { id: 92, message: "I'm confused, can you please clarify?"},
        { id: 93, message: "I'm not sure what you mean."},
        { id: 94, message: "That doesn't sound right."},
        { id: 95, message: "Could you elaborate on that?"},
        { id: 96, message: "I understand, but I'm not sure it's the best idea."},
        { id: 97, message: "I have a different opinion."},
        { id: 98, message: "Let's discuss it some more."},
        { id: 99, message: "I disagree, can you explain more?"},
        { id: 100, message: "I'm not sure why that's the case."},
        { id: 101, message: "I'm not sure I follow."},
        { id: 102, message: "I feel like that could be improved."},
        { id: 103, message: "I'm sorry, I don't understand."},
        { id: 104, message: "That doesn't make much sense to me." },
        { id: 105, message: "I'm not sure about that." },
        { id: 106, message: "Can you explain your thoughts?" },
        { id: 107, message: "I'm not sure how that would work." },
    ]

    useEffect(() => {
        navigation.setOptions({
          title: contact.name,
        })
      }, []);

    const handleSend = () => {
        // send message to contact
        const random = Math.floor(Math.random() * exampleMessages.length);
        setMessages([...messages, {id: messages.length + 1, message: message, sent: true}, 
            {id: messages.length + 2, message: exampleMessages[random].message, sent: false}]);
        
        setMessage('');
    }

    return (
        <View style={localStyles.container}>
            <View style={localStyles.chatContainer}>
                <FlatList
                    inverted
                    data={[...messages].reverse()}
                    renderItem={({ item }) => (
                        <View style={item.sent ? localStyles.sentMessage : localStyles.receivedMessage}>
                            <Text style={localStyles.messageText}>{item.message}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={localStyles.inputContainer}>
                <TextInput
                    style={localStyles.input}
                    onChangeText={text => setMessage(text)}
                    value={message}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={() => handleSend()} style={localStyles.sendButton}>
                    <Text style={localStyles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appBackgroundColor,
        width: '100%',
    },
    chatContainer: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.grey,
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    input: {
        //padding: 10,
        backgroundColor: colors.fieldBackgroundColor,
        flex: 1,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: colors.buttonBackgroundColor,
        padding: 10,
        borderRadius: 7,
        alignContent: 'center',
    },
    sendButtonText: {
        color: colors.buttonTextColor,
        fontWeight: 'bold',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    messageText: {
        color: colors.white,
    },
});

export default Chat;