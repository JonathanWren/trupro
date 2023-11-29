
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../component.style.js';
import { jobflexibility } from './roleview.js';
import { submitApplication } from '../redux/profileSlice.js';

const RoleApply = () => {
  const title = useSelector(state => state.profile.viewRole.title);
  const salary = useSelector(state => state.profile.viewRole.salary);
  const location = useSelector(state => state.profile.viewRole.location);
  const jobType = useSelector(state => state.profile.viewRole.jobType);
  const flexibility = useSelector(state => state.profile.viewRole.flexibility);
  const roleID = useSelector(state => state.profile.viewRole.roleID);
  const [applied, setApplied] = useState(false);
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();

  const handleCvUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(!result.canceled && result.assets.length > 0){
      setFileName(result.assets[0].name);
    }
    
    console.log(result);
  }

  const handleSubmit = async () => {
    if (fileName === '') {
      alert("Please upload your CV before submitting.");
    } else {
      try {
        await dispatch(submitApplication({roleID: roleID}));
        setApplied(true);
      } catch (error) {
        console.error(error);
        alert('An error occurred while submitting the form. Please try again.');
      }
    }
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
                  {fileName !== '' && (
                    <View style={{alignItems: 'center'}}>
                      <Text style={{paddingTop: 30, fontSize: 16}}>CV Uploaded: {fileName}</Text>
                    </View>
                  )}
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
