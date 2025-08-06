import { createContext } from 'react';
import { useOnlinePresence } from '../hooks/chathooks/useOnlinePresence';

// Create the context
const OnlinePresenceContext = createContext();

// Provider component
export function OnlinePresenceProvider({ children }) {
    const presenceData = useOnlinePresence();

    return (
        <OnlinePresenceContext.Provider value={presenceData}>
            {children}
        </OnlinePresenceContext.Provider>
    );
}

export default OnlinePresenceContext;
