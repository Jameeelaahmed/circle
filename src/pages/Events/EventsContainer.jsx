import { useState, useEffect } from "react";
import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-shadcn/dist/index.css";
import EventsPresentional from "./EventsPresentional";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

export default function EventsContainer() {
  const { userId } = useAuth();

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("userEvents");
    return saved ? JSON.parse(saved) : [];
  });

  const [calendars, setCalendars] = useState(() => {
    const saved = localStorage.getItem("userCalendars");
    return saved ? JSON.parse(saved) : {};
  });

  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    date.toISOString().slice(0, 16).replace("T", " ");

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#6BCB77",
      "#4D96FF",
      "#FFB84C",
      "#845EC2",
      "#00C9A7",
      "#FF9671",
      "#2C73D2",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    if (!userId) return;

    const fetchCirclesAndEvents = async () => {
      setLoading(true);
      try {
        const circlesRef = collection(db, "circles");
        const circlesSnap = await getDocs(circlesRef);

        let allEvents = [];
        let fetchedCalendars = {};

        for (const circleDoc of circlesSnap.docs) {
          const circleId = circleDoc.id;
          const circleData = circleDoc.data();

          // Check if user is a member
          const memberRef = doc(db, "circles", circleId, "members", userId);
          const memberSnap = await getDoc(memberRef);

          if (memberSnap.exists()) {
            // build calendar entry
            if (!fetchedCalendars[circleId]) {
              fetchedCalendars[circleId] = {
                colorName: getRandomColor(),
                label: circleData.circleName || "Unnamed Circle", 
                image: circleData.imageUrl || circleData.image || "",
              };
            }

            // fetch events inside the circle
            const eventsRef = collection(db, "circles", circleId, "events");
            const eventsSnap = await getDocs(eventsRef);

            const circleEvents = eventsSnap.docs.map((docSnap) => {
              const data = docSnap.data();
              let startDate;

              if (data.day instanceof Timestamp) startDate = data.day.toDate();
              else if (data.day) startDate = new Date(data.day);
              else if (data.createdAt instanceof Timestamp)
                startDate = data.createdAt.toDate();
              else startDate = new Date();

              const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 

              return {
                id: docSnap.id,
                title: data.activity || "Untitled Event",
                start: formatDate(startDate),
                end: formatDate(endDate),
                calendarId: circleId,
                description: `${data.place || ""} - ${data.Location || ""}`,
                circleName: circleData.name || "Unnamed Circle", 
                circleImage: circleData.imageUrl || circleData.image || "", 
              };
            });

            allEvents = [...allEvents, ...circleEvents];
          }
        }

        setEvents(allEvents);
        setCalendars(fetchedCalendars);

        localStorage.setItem("userEvents", JSON.stringify(allEvents));
        localStorage.setItem("userCalendars", JSON.stringify(fetchedCalendars));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCirclesAndEvents();
  }, [userId]);

const calendarApp = useCalendarApp({
  isDark: true,
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  selectedDates: new Date().toISOString().slice(0, 10),
  plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  calendars: calendars,
  events: events,
eventContent: (event) => {
  return (
    <div className="flex items-center gap-2">
      {event.circleImage && (
        <img
          src={event.circleImage}
          alt={event.circleName}
          className="h-6 w-6 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{event.title}</span>
        <span className="text-[10px] text-gray-400">{event.circleName}</span>
      </div>
    </div>
  );
},

});


  if (loading && !events.length) {
    return (
      <div
        className="flex min-h-screen animate-pulse flex-col gap-4 p-4"
        style={{
          background:
            "radial-gradient(ellipse at top, #17284f93 0%, transparent 60%)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Calendar header skeleton */}
        <div className="h-10 w-1/3 rounded-xl bg-gray-700/40"></div>

        {/* Weekday headers skeleton */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-6 rounded-md bg-gray-700/30"></div>
          ))}
        </div>

        {/* Calendar grid skeleton */}
        <div className="grid flex-1 grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-gray-700/20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at top, #17284f93 0%, transparent 60%)",
        backdropFilter: "blur(10px)",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <EventsPresentional
        calendarApp={calendarApp}
        categoryColors={Object.fromEntries(
          Object.entries(calendars).map(([id, c]) => [id, c.colorName]),
        )}
        circlesInfo={calendars}
      />
    </div>
  );
}
