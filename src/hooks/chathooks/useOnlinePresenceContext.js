import { useContext } from 'react';
import OnlinePresenceContext from '../../contexts/OnlinePresenceContext';

// // Hook to use the online presence context
// export function useOnlinePresenceContext() {
//     const context = useContext(OnlinePresenceContext);
//     if (!context) {
//         throw new Error('useOnlinePresenceContext must be used within OnlinePresenceProvider');
//     }
//     return context;
// }

// export default useOnlinePresenceContext;


export function useOnlinePresenceContext() {
    return {
        onlineUsers: {},
        isUserOnline: () => false,
        getUserLastSeen: () => null
    };
}

export default useOnlinePresenceContext; 
