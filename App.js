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
import TrustedContacts from './main/trustedcontacts';
import Profile from './setup/profile';
import KeywordSelector from './main/keywordselector';
import Employment from './setup/employment';
import Organisation from './setup/organisation';
import Location from './setup/location';

import { RegisterContext, SetupContext} from './setup/context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//TODO: Add a splash screen

export const ContactsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen name="Contacts" component={TrustedContacts} />
      <Stack.Screen name="KeywordsSelector" component={KeywordSelector} />
      <Stack.Screen name="ContactList" component={ContactsList} />
    </Stack.Navigator>
  );
};  

export const AppNavigator = () => {
  const { registered } = useContext(RegisterContext);
  const { setup } = useContext(SetupContext);
  if(setup){
    return (
      <Tab.Navigator>
        <Tab.Screen name="TrustedContacts" component={ContactsNavigator} />
        <Tab.Screen name="Reputation" component={Reputation} />
        <Tab.Screen name="Next Move" component={Opportunity} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  } else if (registered) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Trusted Colleagues" component={ContactsList} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Employment" component={Employment} />
        <Stack.Screen name="Organisation" component={Organisation} />
        <Stack.Screen name="Verification" component={Register} />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [setup, setSetup] = useState(false);

  return (
    <RegisterContext.Provider value={{ registered, setRegistered }}>
      <SetupContext.Provider value={{ setup, setSetup }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SetupContext.Provider>
    </RegisterContext.Provider>
  );
}

export default App;
