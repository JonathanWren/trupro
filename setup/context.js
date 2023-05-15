import { createContext } from 'react';

export const RegisterContext = createContext({
    registered: false, 
    setRegistered: () => {},
  });

export const SetupContext = createContext({
    setup: false,
    setSetup: () => {},
  });