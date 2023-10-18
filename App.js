import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsList from './setup/ContactsList';
import Register from './setup/register';
import Welcome from './setup/welcome';
import Setup from './setup/setup';
import Reputation from './main/reputation';
import Opportunity from './main/opportunity';
import Profile from './setup/profile';
import KeywordSelector from './main/keywordselector';
import Employment from './setup/employment';
import Organisation from './setup/organisation';
import Location from './setup/location';
import Chats from './main/chats';
import Chat from './main/chat';
import ClickLink from './setup/clicklink';
import AddChat from './main/addchat';
import RequestIntroduction from './main/requestintroduction';
import RecommendedBy from './main/recommendedby';
import Role from './main/role';
import RoleLocation from './main/rolelocation';
import RoleSalary from './main/rolesalary';
import RoleJobType from './main/roletype';
import RoleSeniority from './main/roleseniority';
import Jobs from './main/jobs';
import JobDetails from './main/jobdetails';
import RequestLink from './setup/requestlink';
import MyJobs from './main/myjobs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Sentry from 'sentry-expo';
import * as Linking from 'expo-linking';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {updateVerificationCode } from './redux/profileSlice.js';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ReputationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reputation" component={Reputation} />
      <Stack.Screen name="Recommended By" component={RecommendedBy} />
      <Stack.Screen name="Keywords Selector" component={KeywordSelector} />
      <Stack.Screen name="Contacts List" component={ContactsList} initialParams={{'inWizard':false}} />
    </Stack.Navigator>
  );
}

//TODO: Add a splash screen

export const ContactsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recommended Colleagues" component={TrustedContacts} />
      <Stack.Screen name="Keywords Selector" component={KeywordSelector} />
      <Stack.Screen name="Contacts List" component={ContactsList} initialParams={{'inWizard':false}}/>
    </Stack.Navigator>
  );
};  

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} initialParams={{'inWizard':false}}/>
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
};

export const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="RequestIntroduction" component={RequestIntroduction} />
    </Stack.Navigator>
  );
};

export const OpportunityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Next Move" component={Opportunity} />
      <Stack.Screen name="Role" component={Role} />
      <Stack.Screen name="RoleLocation" component={RoleLocation} />
      <Stack.Screen name="RoleSalary" component={RoleSalary} />
      <Stack.Screen name="RoleJobType" component={RoleJobType} />
      <Stack.Screen name="RoleSeniority" component={RoleSeniority} />
    </Stack.Navigator>
  );
};

export const JobsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JobsTabs" component={JobsTopTabNavigator}/>
      <Stack.Screen name="Job Details" component={JobDetails} />
    </Stack.Navigator>
  );
};

const TopTab = createMaterialTopTabNavigator();

export const JobsTopTabNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Jobs" component={Jobs} />
      <TopTab.Screen name="My Jobs" component={MyJobs} />
    </TopTab.Navigator>
  );
};

export const AppNavigator = () => {
  var setup = false;
  const dispatch = useDispatch();
  const deviceID = useSelector(state => state.profile.mainDetails.deviceID);
  if(deviceID != ''){
    setup = true;
  }

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
       if (url) {
          handleDeepLink({url});
       }
    });
    return () => {
       linkingEvent.remove();
    };
  }, [handleDeepLink]);
  
  const handleDeepLink = async (url) => {
      // add your code here
      const { hostname, path, queryParams } = Linking.parse(url.url);
      
      if(path == "verify"){
        dispatch (
          updateVerificationCode({verificationCode: queryParams.token})
        )
      }     
  }
  if(setup){
    return (
      <Tab.Navigator>
        {/* <Tab.Screen name="ChatsNav" component={ChatNavigator} options={{headerShown: false, tabBarLabel: "Chats", unmountOnBlur: true }}/> */}
        <Tab.Screen name="Next Move Nav" component={OpportunityNavigator} options={{headerShown: false, tabBarLabel: "Next Move", tabBarIcon: ({tintColor}) =>
          <FontAwesome name="mail-forward" size={24} color={tintColor} />}} />
        {/* <Tab.Screen name="ReputationNav" component={ReputationNavigator} options={{headerShown: false, tabBarLabel: "Reputation", unmountOnBlur: true}} />
        <Tab.Screen name="JobsNav" component={JobsNavigator} options={{headerShown: false, tabBarLabel: "Jobs"}}/> */}
        <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({tintColor}) =>
          <AntDesign name="profile" size={24} color={tintColor} />}} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Request Link" component={RequestLink} />
        <Stack.Screen name="Click Link" component={ClickLink} />
        <Stack.Screen name="Profile" component={Profile} initialParams={{'inWizard':true}}/>
        <Stack.Screen name="Verification" component={Register} />
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Recommended Colleagues" component={ContactsList} initialParams={{'inWizard':true}}/>
      </Stack.Navigator>
    );
  }
};

const App = () => {

  Sentry.init({
    dsn: "https://a92eded437e0a7221474cd2de14ffa53@o4505770833084416.ingest.sentry.io/4505770877255680",
    enableInExpoDevelopment: false,
    debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
