
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector } from 'react-redux';
import styles from '../component.style.js';
import { jobflexibility } from './roleview.js';

const RoleApply = () => {
  const title = useSelector(state => state.profile.viewRole.title);
  const salary = useSelector(state => state.profile.viewRole.salary);
  const location = useSelector(state => state.profile.viewRole.location);
  const jobType = useSelector(state => state.profile.viewRole.jobType);
  const flexibility = useSelector(state => state.profile.viewRole.flexibility);
  const [applied, setApplied] = useState(false);

  const handleCvUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
}

  const handleSubmit = () => {
    // Submit form data and CV to server
    setApplied(true);
  };

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.centerView}>
              {!applied && (
                <View>
                  <View style={{alignItems: 'center'}}>
                      <Text style={styles.roleTitle}>{title}</Text>
                      <Text style={styles.text}>{salary}</Text>
                      <Text style={styles.text}>{location} - {jobType} - {jobflexibility[flexibility]}</Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => {handleCvUpload()}}>
                      <Text style={styles.buttonText}>Upload CV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => {handleSubmit()}}>
                      <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
                )}
                {applied && (
                <View>
                  <View style={{alignItems: 'center'}}>
                      <Text style={styles.roleTitle}>{title}</Text>
                      <Text style={styles.text}>{salary}</Text>
                      <Text style={styles.text}>{location} - {jobType} - {jobflexibility[flexibility]}</Text>
                      <Text style={{paddingTop: 30, fontSize: 16}}>Thank you for applying for this role.</Text>
                  </View>
                </View>
                )}
            </View>
        </ScrollView>
    </View>
  );
};

export default RoleApply;
