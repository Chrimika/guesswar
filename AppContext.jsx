import React, { createContext, useState, useContext } from 'react';

// Créer un contexte
const AppContext = createContext();

// Créer un fournisseur de contexte
export const AppProvider = ({ children }) => {
    
  const [sharedState, setSharedState] = useState();
  const [partyName, setPartyName] = useState('');
  const [intervalMin, setIntervalMin] = useState('');
  const [intervalMax, setIntervalMax] = useState('');
  const [numPlayers, setNumPlayers] = useState('');

  return (
    <AppContext.Provider value={{ sharedState, setSharedState, partyName, setPartyName, intervalMin, setIntervalMin, intervalMax, setIntervalMax, numPlayers, setNumPlayers }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAppContext = () => {
  return useContext(AppContext);
};