import { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../../firebase-config';
import { useAuth } from '../useAuth';
export const useOnlinePresence = () => {
    const [onlineUsers, setOnlineUsers] = useState({});
    const { user } = useAuth();

    useEffect(() => {

        if (!user) {
            return;
        }

        const presenceRef = ref(database, 'presence');
        const userPresenceRef = ref(database, `presence/${user.uid}`);
        // Set user online in RTDB
        const setUserOnline = async () => {
            const userData = {
                isOnline: true,
                lastSeen: Date.now(),
                username: user.username || 'Unknown User',
                email: user.email,
                uid: user.uid
            };
            try {
                await set(userPresenceRef, userData);
            } catch (err) {
                console.error('Error setting user online in RTDB:', err);
            }
        };

        const setUserOffline = async () => {
            try {
                await set(userPresenceRef, {
                    isOnline: false,
                    lastSeen: Date.now()
                });
            } catch (err) {
                console.error('Error setting user offline in RTDB:', err);
            }
        };

        // Listen to all users' presence using RTDB
        const unsubscribe = onValue(presenceRef, (snapshot) => {
            const presenceData = snapshot.val() || {};
            setOnlineUsers(presenceData);
        }, (error) => {
            console.error('Error listening to presence:', error);
        });

        // Initialize presence
        setUserOnline();

        // Handle page visibility changes
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                await setUserOffline();
            } else {
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
