import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
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
import { Provider } from 'react-redux';
import store from './redux/store';
import * as Linking from 'expo-linking';
import * as Sentry from 'sentry-expo';

import { RegisterContext, SetupContext} from './setup/context';

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
  const { registered } = useContext(RegisterContext);
  const { setup } = useContext(SetupContext);
  if(setup){
    return (
      <Tab.Navigator>
        {/* <Tab.Screen name="ChatsNav" component={ChatNavigator} options={{headerShown: false, tabBarLabel: "Chats", unmountOnBlur: true }}/> */}
        <Tab.Screen name="Next Move Nav" component={OpportunityNavigator} options={{headerShown: false, tabBarLabel: "Next Move"}} />
        <Tab.Screen name="ReputationNav" component={ReputationNavigator} options={{headerShown: false, tabBarLabel: "Reputation", unmountOnBlur: true}} />
        <Tab.Screen name="JobsNav" component={JobsNavigator} options={{headerShown: false, tabBarLabel: "Jobs"}}/>
        <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{headerShown: false, tabBarLabel: "Profile"}} />
      </Tab.Navigator>
    );
  } else if (registered) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Recommended Colleagues" component={ContactsList} initialParams={{'inWizard':true}}/>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Request Link" component={RequestLink} />
        <Stack.Screen name="Click Link" component={ClickLink} />
        <Stack.Screen name="Profile" component={Profile} initialParams={{'inWizard':true}}/>
        <Stack.Screen name="Verification" component={Register} />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [setup, setSetup] = useState(false);

  return (
    <Provider store={store}>
      <RegisterContext.Provider value={{ registered, setRegistered }}>
        <SetupContext.Provider value={{ setup, setSetup }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SetupContext.Provider>
      </RegisterContext.Provider>
    </Provider>
  );
}

export default App;
