//write a reach native component to allow selecting from a list of keywords displayed in boxes or entering a custom one

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from '../component.style.js';
import { useNavigation } from '@react-navigation/native';
import { SetupContext } from '../setup/context.js';

const keywords = ['Innovative', 'Hard Working', 'Smart', 'Intelligent', 'Astute', 'Positive Attitude', 'Able to admit mistakes', 'Good Communicator', 
'Listener', 'Perseverance', 'Team Player', 'Leader', 'Good Manager', 'Reliable', 'Courageous'];

const KeywordSelector = (props) => {
  const [keywordsSelected, setKeywordsSelected] = useState([]);
  const nav  = useNavigation();
  const { setSetup } = useContext(SetupContext);
  const { contact } = props.route.params;

  const renderKeywords = () => {
    return keywords.map((keyword, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[localStyles.keywordContainer, keywordsSelected.includes(keyword) && {backgroundColor: 'red'}]}
          onPress={() => {
            keywordsSelected.includes(keyword)? setKeywordsSelected(keywordsSelected.filter((k) => k !== keyword)) :
            setKeywordsSelected([...keywordsSelected, keyword]);
          }}
        >
          <Text style={localStyles.keywordText}>{keyword}</Text>
        </TouchableOpacity>
      )
    });
  };

  return (
    <View style={styles.container}>
      <View style={localStyles.container}>
        <Text style={styles.heading}>What keywords describe {contact.name}'s character?</Text>
        {renderKeywords()}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {setSetup(true);}}
        > 
          <Text style={styles.buttonText}>Invite</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
};

export default KeywordSelector;

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keywordContainer: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    margin: 5,
  },
  keywordText: {
    fontSize: 16,
    color: 'white'
  },
});