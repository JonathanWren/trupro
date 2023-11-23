
import React from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector } from 'react-redux';

const RoleApply = () => {
  const title = useSelector(state => state.profile.viewRole.title);

  const handleCvUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
}

  const handleSubmit = () => {
    // Submit form data and CV to server
    console.log('Name:', name);
    console.log('Email:', email);
  };

  return (
    <View>
      <Text>{title}</Text>
      <Button title="Upload CV" onPress={handleCvUpload} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default RoleApply;
