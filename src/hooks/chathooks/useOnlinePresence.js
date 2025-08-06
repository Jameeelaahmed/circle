import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from '../useAuth';

export const useOnlinePresence = () => {
    const [onlineUsers, setOnlineUsers] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            console.log('useOnlinePresence: No user found, skipping presence setup');
            return;
        }

        const presenceRef = collection(db, 'presence');
        const userPresenceRef = doc(db, 'presence', user.uid);

        const setUserOnline = async () => {
            const userData = {
                isOnline: true,
                lastSeen: serverTimestamp(),
                username: user.username || 'Unknown User',
                email: user.email,
                uid: user.uid
            };
            try {
                await setDoc(userPresenceRef, userData, { merge: true });
            } catch (error) {
                console.error('Error setting user online:', error);
            }
        };

        // Set user as offline
        const setUserOffline = async () => {
            try {
                await setDoc(userPresenceRef, {
                    isOnline: false,
                    lastSeen: serverTimestamp(),
                }, { merge: true });
            } catch (error) {
                console.error('Error setting user offline:', error);
            }
        };

        // Listen to all users' presence using Firestore
        const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
            const presenceData = {};
            snapshot.forEach(doc => {
                presenceData[doc.id] = doc.data();
            });
            setOnlineUsers(presenceData);
        }, (error) => {
            console.error('Error listening to presence:', error);
        });

        // Initialize presence
        setUserOnline();

        // Handle page visibility changes
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                // User switched tabs or minimized window
                await setUserOffline();
            } else {
                // User came back
                await setUserOnline();
            }
        };

        // Handle beforeunload (page close/refresh)  
        const handleBeforeUnload = async () => {
            await setUserOffline();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Cleanup
            unsubscribe();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);

            // Set user offline when component unmounts
            setUserOffline();
        };
    }, [user]);

    return {
        onlineUsers,
        isUserOnline: (userId) => {
            const isOnline = onlineUsers[userId]?.isOnline || false;
            return isOnline;
        },
        getUserLastSeen: (userId) => onlineUsers[userId]?.lastSeen || null
    };
};

export default useOnlinePresence;
