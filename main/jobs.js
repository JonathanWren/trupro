// Screen showing a list of job opportunities and allowing swipe left to discard and swipe right to save. Clicking on a job opportunity should show a screen with more details about the job opportunity.

import React, {useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Image, StyleSheet, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import style, { colors } from '../component.style.js';
import { jobsList as exampleJobsList } from './examplejobs.js';
import { GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const LeftSwipeActions = () => {
    return (
      <View
        style={{ alignItems: 'flex-start', backgroundColor: '#ccffbd', justifyContent: 'center', width: '100%' }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Save
        </Text>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Discard
        </Text>
      </View>
    );
  };


const Jobs = ({route}) => {
    const [localJobs, setLocalJobs] = useState([]);

    useEffect(() => {
      console.log(route);
        if (route && route.params && route.params.jobsList) {
          console.log('Jobs list passed in, using that');
            setLocalJobs(route.params.jobsList);
        } else {
          console.log('No jobs list passed in, using example jobs list');
            setLocalJobs(exampleJobsList);
        }
    }, [route]);

    const JobsListItem = ({ item }) => {
      const nav = useNavigation();

      const swipeOpen = (direction) => {
        setLocalJobs((prev) => (prev.filter((job) => job.id !== item.id)));
      };

      handleClick = (url) => {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
        };

      return (
          <Swipeable
              renderLeftActions={LeftSwipeActions}
              renderRightActions={rightSwipeActions}
              onSwipeableOpen={swipeOpen}
          >
              <TouchableOpacity onPress={() => {nav.navigate('Job Details', {job: item, jobsList: localJobs})}}>
                <View style={[style.contactCon, {backgroundColor: 'white'}]} >
                    <View style={style.imgCon}>
                        <View style={style.contactImageTextCircle}>
                            <Image source={{ uri: 'https://s2.googleusercontent.com/s2/favicons?sz=32&domain=' + item.companyURL }} style={{ width: 32, height: 32 }} />   
                        </View>
                    </View>
                    <View style={style.contactDat}>
                    <Text style={style.contactName}>
                        {item?.name}
                    </Text>
                    <Text style={style.text}>{item?.companyName}</Text>
                    <Text style={style.contactName}>
                        {item?.location}
                    </Text>
                    </View>
                </View>
              </TouchableOpacity>
          </Swipeable>
      );
    }

    return (
        <View style={style.containerListView}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingRight: 25, paddingLeft: 25,
                    paddingTop: 25}}>
                <Text style={style.heading}>Job Opportunities</Text>
            </View>
            <GestureHandlerRootView style={{width: '100%', flex: 1}}>
              <FlatList
                  data={localJobs}
                  keyExtractor={(item) => item.id}
                  style={{width: '100%'}}
                  renderItem={({ item }) => (
                      <JobsListItem item={item} />
                  )} 
              />
            </GestureHandlerRootView>
        </View>
    );
}

export default Jobs;
