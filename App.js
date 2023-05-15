import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsList from './setup/ContactsList';
import Register from './setup/register';
import Welcome from './setup/welcome';
import Setup from './setup/setup';
import Reputation from './main/reputation';
import Opportunity from './main/opportunity';
import TrustedContacts from './main/trustedcontacts';
import Profile from './profile';
import KeywordSelector from './setup/keywordselector';

import { RegisterContext, SetupContext} from './setup/context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//TODO: Add a splash screen

export const AppNavigator = () => {
  const { registered } = useContext(RegisterContext);
  const { setup } = useContext(SetupContext);

  if(setup){
    return (
      <Tab.Navigator>
        <Tab.Screen name="TrustedContacts" component={TrustedContacts} />
        <Tab.Screen name="Reputation" component={Reputation} />
        <Tab.Screen name="Opportunity" component={Opportunity} />
      </Tab.Navigator>
    );
  } else if (registered) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Invite Contact" component={ContactsList} />
        <Stack.Screen name="KeywordSelector" component={KeywordSelector} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
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
