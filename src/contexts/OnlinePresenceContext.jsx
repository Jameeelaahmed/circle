

import { createContext } from 'react';
import { useOnlinePresence } from '../hooks/chathooks/useOnlinePresence';

// Create the context
const OnlinePresenceContext = createContext();

// Provider component - Online presence feature disabled to prevent Firestore spam
export function OnlinePresenceProvider({ children }) {
    const presenceData = useOnlinePresence();

    return (
        <OnlinePresenceContext.Provider value={presenceData}>
            {children}
        </OnlinePresenceContext.Provider>
    );
}

export default OnlinePresenceContext;