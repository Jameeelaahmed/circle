// import { useState, useEffect } from 'react';
// import { doc, setDoc, onSnapshot, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase-config';
// import { useAuth } from './useAuth';

// export const useOnlinePresence = () => {
//     const [onlineUsers, setOnlineUsers] = useState({});
//     const { user } = useAuth();


//     useEffect(() => {
//         if (!user) {
//             console.log('👤 useOnlinePresence: No user found, skipping presence setup');
//             return;
//         }

//         console.log('🚀 useOnlinePresence: Setting up presence for user:', user.uid, user.email);

//         const presenceRef = collection(db, 'presence');
//         const userPresenceRef = doc(db, 'presence', user.uid);

//         // Set user as online
//         const setUserOnline = async () => {
//             const userData = {
//                 isOnline: true,
//                 lastSeen: serverTimestamp(),
//                 username: user.username || user.displayName || user.email || 'Unknown User',
//                 email: user.email,
//                 uid: user.uid
//             };
//             console.log('📝 User data to set:', userData);

//             try {
//                 await setDoc(userPresenceRef, userData, { merge: true });
//             } catch (error) {
//                 console.error('❌ Error setting user online:', error);
//             }
//         };

//         // Set user as offline
//         const setUserOffline = async () => {
//             try {
//                 await setDoc(userPresenceRef, {
//                     isOnline: false,
//                     lastSeen: serverTimestamp(),
//                 }, { merge: true });
//                 console.log('🔌 Successfully set user offline');
//             } catch (error) {
//                 console.error('❌ Error setting user offline:', error);
//             }
//         };

//         // Listen to all users' presence using Firestore
//         const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
//             const presenceData = {};
//             snapshot.forEach(doc => {
//                 presenceData[doc.id] = doc.data();
//             });
//             console.log('📡 Presence data updated:', presenceData);
//             setOnlineUsers(presenceData);
//         }, (error) => {
//             console.error('❌ Error listening to presence:', error);
//         });

//         // Initialize presence
//         setUserOnline();

//         // Handle page visibility changes
//         const handleVisibilityChange = async () => {
//             if (document.hidden) {
//                 // User switched tabs or minimized window
//                 console.log('👁️ User went offline (tab hidden)');
//                 await setUserOffline();
//             } else {
//                 // User came back
//                 console.log('👁️ User came back online (tab visible)');
//                 await setUserOnline();
//             }
//         };

//         // Handle beforeunload (page close/refresh)  
//         const handleBeforeUnload = async () => {
//             console.log('🚪 User closing page');
//             await setUserOffline();
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             // Cleanup
//             console.log('🧹 Cleaning up presence for user:', user.uid);
//             unsubscribe();
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//             window.removeEventListener('beforeunload', handleBeforeUnload);

//             // Set user offline when component unmounts
//             setUserOffline();
//         };
//     }, [user]);

//     return {
//         onlineUsers,
//         isUserOnline: (userId) => {
//             const isOnline = onlineUsers[userId]?.isOnline || false;
//             console.log(`🔍 Checking if user ${userId} is online:`, isOnline);
//             return isOnline;
//         },
//         getUserLastSeen: (userId) => onlineUsers[userId]?.lastSeen || null
//     };
// };

// export default useOnlinePresence;

export const useOnlinePresence = () => {
    return {
        onlineUsers: {},
        isUserOnline: () => false,
        getUserLastSeen: () => null
    };
};

export default useOnlinePresence;