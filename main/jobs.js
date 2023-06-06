// Screen showing a list of job opportunities and allowing swipe left to discard and swipe right to save. Clicking on a job opportunity should show a screen with more details about the job opportunity.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, } from 'react-native';
import style, { colors } from '../component.style.js';
import { GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import { discardJob, saveJob } from '../redux/jobsSlice.js';
import JobsListItem from './joblistitem.js';

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

  const JobsListItemSwipeable = ({ item }) => {
    const dispatch = useDispatch();

    const swipeOpen = (direction) => {
      if (direction === 'left') {
        dispatch(
          saveJob({
            id: item.id
          })
        )
      } else {
        dispatch(
          discardJob({
            id: item.id
          })
        )
      }

    };

    return (
        <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={rightSwipeActions}
            onSwipeableOpen={swipeOpen}
        >
            <JobsListItem item={item} />
        </Swipeable>
    );
  }

const Jobs = () => {
    const jobs = useSelector(state => state.jobs.jobsList);    

    return (
        <View style={style.containerListView}>
            <GestureHandlerRootView style={{width: '100%', flex: 1}}>
              <FlatList
                  data={jobs}
                  keyExtractor={(item) => item.id}
                  style={{width: '100%'}}
                  renderItem={({ item }) => (
                      <JobsListItemSwipeable item={item} />
                  )} 
              />
            </GestureHandlerRootView>
        </View>
    );
}

export default Jobs;
