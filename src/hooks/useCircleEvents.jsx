import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export const useCircleEvents = (circleIds) => {
  const [eventsByCircle, setEventsByCircle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!circleIds || circleIds.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribeFunctions = [];

    circleIds.forEach(circleId => {
      const eventsQuery = query(
        collection(db, "circles", circleId, "events"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setEventsByCircle(prev => ({
          ...prev,
          [circleId]: events
        }));
      });

      unsubscribeFunctions.push(unsubscribe);
    });

    setLoading(false);

    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, [circleIds]);

  return { eventsByCircle, loading };
};