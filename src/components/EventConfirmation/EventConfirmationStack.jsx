import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import PendingEventCard from "./PendingEventCard";

export default function EventConfirmationStack({ circleId }) {
  const [pendingEvents, setPendingEvents] = useState([]);
  function isFuture(dateString) {
    const today = new Date();
    const eventDate = new Date(dateString);
    return eventDate >= today;
  }


  useEffect(() => {
    if (!circleId) return;

    const q = query(
      collection(db, "circles", circleId, "events"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingEvents(events);
    });

    return () => unsubscribe();
  }, [circleId]);

  return (
    <div className="flex flex-col gap-2">
      {pendingEvents.length > 0 ? (
        pendingEvents
          .filter((event) => isFuture(event.day) || event.status === "pending")
          .map((event) => (
            <PendingEventCard key={event.id} event={event} />
          ))
      ) : (
        <p className="text-xs text-text-400">No upcoming events</p>
      )}
    </div>
  );
}
